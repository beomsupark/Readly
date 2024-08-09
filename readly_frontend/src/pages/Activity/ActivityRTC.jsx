import { useState, useEffect, useRef } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import useUserStore from "../../store/userStore";
import ShareModal from "./ShareModal";
import VideoConferenceView from "./VideoConferenceView";

const API_BASE_URL = "https://i11c207.p.ssafy.io/api";

const ActivityRTC = ({ groupId }) => {
  const [isVideoConferenceActive, setIsVideoConferenceActive] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharedItems, setSharedItems] = useState([]);
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [isRoomCreated, setIsRoomCreated] = useState(false);
  const { user } = useUserStore();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [photoCards, setPhotoCards] = useState();
  const [reviews, setReviews] = useState();
  const [notification, setNotification] = useState(null);

  const OV = useRef(null);

  useEffect(() => {
    setIsRoomCreated(checkSessionExists());
    if (isVideoConferenceActive) {
      joinSession();
    } else {
      leaveSession();
    }
  }, [isVideoConferenceActive]);

  useEffect(() => {
    if (!session) return;

    session.on("signal:share", (signal) => {
      const data = JSON.parse(signal.data);
      if (data.type === "share") {
        const items = data.items;
        setSharedItems((prevItems) => {
          const newItems = items.filter(item => 
            !prevItems.some(prevItem => 
              (item.photocardId && prevItem.photocardId === item.photocardId) ||
              (item.reviewId && prevItem.reviewId === item.reviewId)
            )
          );
          return [...prevItems, ...newItems];
        });
      }
    });

    session.on("signal:stopshare", (signal) => {
      const data = JSON.parse(signal.data);
      if (data.type === "stopshare") {
        const { itemId, itemType } = data;
        setSharedItems(prevItems => 
          prevItems.filter(item => 
            itemType === 'photocard' ? item.photocardId !== itemId : item.reviewId !== itemId
          )
        );
      }
    });
  }, [session]);

  const getMyPhotocards = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/member/photocards/${user.id}`
    );
    return response.data["my-photocards"];
  };

  const getMyReviews = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/member/reviews/${user.id}`
    );
    return response.data["my-reviews"];
  };

  const checkSessionExists = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/rtc/sessions/check`, {
        params: { sessionId: "1" },
      });
      return response.data;
    } catch (error) {
      console.error("Error checking session existence:", error);
    }
  };

  const initializeSession = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/rtc/sessions`, {
        customSessionId: "1",
      });
      setIsRoomCreated(true);
      return response.data;
    } catch (error) {
      console.error("세션 초기화 오류:", error);
    }
  };

  const getToken = async () => {
    try {
      const sessionId = await initializeSession();
      const response = await axios.post(
        `${API_BASE_URL}/rtc/sessions/${sessionId}/connections`
      );
      return response.data;
    } catch (error) {
      console.error("토큰 가져오기 오류:", error);
    }
  };

  const joinSession = async () => {
    OV.current = new OpenVidu();
    const mySession = OV.current.initSession();

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    mySession.on("streamDestroyed", (event) => {
      setSubscribers((prevSubscribers) =>
        prevSubscribers.filter((sub) => sub !== event.stream.streamManager)
      );
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    try {
      const token = await getToken();
      await mySession.connect(token, { clientData: user.nickname });

      const newPublisher = await OV.current.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: isMicOn,
        publishVideo: isVideoOn,
        resolution: "640x480",
        frameRate: 30,
        insertMode: "APPEND",
        mirror: false,
      });

      mySession.publish(newPublisher);

      setSession(mySession);
      setPublisher(newPublisher);
      setSessionId(sessionId);
    } catch (error) {
      console.error("세션 연결 오류:", error);
    }
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }
    setSession(null);
    setPublisher(null);
    setSubscribers([]);
    setSessionId(null);
    OV.current = null;
  };

  const toggleVideoConference = () => {
    setIsVideoConferenceActive((prev) => !prev);
  };

  const openShareModal = () => {
    setIsShareModalOpen(true);
    getMyPhotocards().then(setPhotoCards);
    getMyReviews().then(setReviews);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  const handleShare = (selectedItems) => {
    closeShareModal();

    const newItems = selectedItems.filter((item) => {
      const existingItem = sharedItems.find(
        (sharedItem) =>
          (item.photocardId && sharedItem.photocardId === item.photocardId) ||
          (item.reviewId && sharedItem.reviewId === item.reviewId)
      );
      if (existingItem) {
        setNotification("이미 공유된 아이템입니다.");
        setTimeout(() => setNotification(null), 1000);
        return false;
      }
      return true;
    });

    if (newItems.length > 0) {
      session
        .signal({
          data: JSON.stringify({ type: "share", items: newItems }),
          to: [],
          type: "share",
        })
        .catch((error) => console.error("Error sending signal:", error));
    } else {
      setNotification("모든 선택된 아이템이 이미 공유되었습니다.");
      setTimeout(() => setNotification(null), 1000);
    }
  };

  const toggleMic = () => {
    setIsMicOn((prevState) => {
      const newMicState = !prevState;
      if (publisher) {
        publisher.publishAudio(newMicState);
      }
      return newMicState;
    });
  };

  const toggleVideo = () => {
    setIsVideoOn((prevState) => {
      const newVideoState = !prevState;
      if (publisher) {
        publisher.publishVideo(newVideoState);
      }
      return newVideoState;
    });
  };

  const isIShared = (item) => {
    const itemId = item.photocardId || item.reviewId;
    return item.memberId === user.id ? (
      <button
        onClick={(e) => {
          e.stopPropagation();
          stopSharing(itemId, item.photocardId ? 'photocard' : 'review');
        }}
        className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-xs"
      >
        공유해제
      </button>
    ) : null;
  };

  const stopSharing = (itemId, itemType) => {
    session
      .signal({
        data: JSON.stringify({ type: "stopshare", itemId: itemId, itemType: itemType }),
        to: [],
        type: "stopshare",
      })
      .catch((error) => console.error("Error sending signal:", error));

    // 로컬 상태도 업데이트
    setSharedItems(prevItems => 
      prevItems.filter(item => 
        itemType === 'photocard' ? item.photocardId !== itemId : item.reviewId !== itemId
      )
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 pb-16 relative z-10">
      {!isRoomCreated ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p>현재 진행 중인 화상회의가 없습니다.</p>
          <button
            onClick={toggleVideoConference}
            className="px-4 py-2 bg-green-500 text-white rounded-full shadow-lg text-lg"
          >
            화상회의 만들기
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-xl mb-4">
            {isVideoConferenceActive
              ? "화상회의가 진행중입니다"
              : "화상회의를 종료했습니다"}
          </p>
          <button
            onClick={toggleVideoConference}
            className={`px-4 py-2 rounded-full shadow-lg text-lg ${
              isVideoConferenceActive ? "bg-red-500" : "bg-green-500"
            } text-black`}
          >
            {isVideoConferenceActive ? "화상회의 종료" : "화상회의 참여"}
          </button>
        </div>
      )}

      {isVideoConferenceActive && (
        <VideoConferenceView
          publisher={publisher}
          subscribers={subscribers}
          sharedItems={sharedItems}
          isMicOn={isMicOn}
          isIShared={isIShared}
          notification={notification}
        />
      )}

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {isRoomCreated && (
          <>
            <button
              onClick={toggleVideoConference}
              className={`px-3 py-1 rounded-full shadow-lg text-sm ${
                isVideoConferenceActive ? "bg-red-500" : "bg-green-500"
              } text-black`}
            >
              {isVideoConferenceActive ? "화상회의 종료" : "화상회의 참여"}
            </button>
            <button
              onClick={openShareModal}
              className="bg-blue-500 text-black px-3 py-1 rounded-full shadow-lg text-sm"
            >
              공유하기
            </button>
            <button
              onClick={toggleMic}
              className="bg-blue-500 text-black px-3 py-1 rounded-full shadow-lg text-sm"
            >
              {isMicOn ? "마이크 off" : "마이크 on"}
            </button>
            <button
              onClick={toggleVideo}
              className="bg-blue-500 text-black px-3 py-1 rounded-full shadow-lg text-sm"
            >
              {isVideoOn ? "카메라 off" : "카메라 on"}
            </button>
          </>
        )}
      </div>

      {isShareModalOpen && (
        <ShareModal
          onClose={closeShareModal}
          onShare={handleShare}
          photoCards={photoCards}
          reviews={reviews}
        />
      )}
    </div>
  );
};

export default ActivityRTC;