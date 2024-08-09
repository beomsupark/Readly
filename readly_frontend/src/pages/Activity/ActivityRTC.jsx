import { useState, useEffect, useRef } from 'react';
import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import useUserStore from "../../store/userStore";



const API_BASE_URL = 'https://i11c207.p.ssafy.io/api';

const ActivityRTC = ({ groupId }) => {
  const [isVideoConferenceActive, setIsVideoConferenceActive] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharedItems, setSharedItems] = useState([]);
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [isRoomCreated, setIsRoomCreated] = useState(false);
  const { user, token } = useUserStore();
  const [isMicOn, setIsMicOn] = useState(true); // Default to true
  const [isVideoOn, setIsVideoOn] = useState(true); // Default to true
  const [subMicStatus, setSubMicStatus] = useState({});
  const [photoCards,setPhotoCards] = useState();

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
    if(!session)
    {
        return;
    }
    // 세션 연결 및 신호 수신 핸들러 설정
    session.on('signal:micStatus', (signal) => {
      
      console.log("secess litsen");
      console.log(signal.from.connectionId);
      const data = JSON.parse(signal.data);
      if (data.type === 'mic') {
        const micState = data.state;
        const connectionId = signal.from;
        setSubMicStatus(prevState => ({
          ...prevState,
          [connectionId]: micState // connectionId를 키로 사용하고 micState를 값으로 저장
        }));
        
      }
    });
    session.on('signal:share', (signal) => {
      
      const data = JSON.parse(signal.data);
      if (data.type === 'share') {
        const items = data.items;
        setSharedItems(prevItems => [...prevItems, ...items]);
        
      }
    });
    session.on('signal:stopshare', (signal) => {
      
      const data = JSON.parse(signal.data);
      if (data.type === 'stopshare') {
        const itemId = data.itemId;
        setSharedItems(sharedItems.filter(item => item.id !== itemId));
        
      }
    });
  }, [session]);
  
           
  const getMyPhotocards = async () => {
    
    const response = await axios.get(`${API_BASE_URL}/member/photocards/${user.id}`);
    
    return response.data['my-photocards'];
    
  }

  const checkSessionExists = async() => {
    try {
      const response = await axios.get(`${API_BASE_URL}/rtc/sessions/check`, {
        params: { sessionId: '1' }
      });
      return response.data;
    } catch (error) {
      console.error('Error checking session existence:', error);
    }
  };

  const initializeSession = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/rtc/sessions`, { customSessionId: '1' });
      setIsRoomCreated(true);
      return response.data;
    } catch (error) {
      console.error('세션 초기화 오류:', error);
    }
  };

  const getToken = async () => {
    try {
      const sessionId = await initializeSession();
      const response = await axios.post(`${API_BASE_URL}/rtc/sessions/${sessionId}/connections`);
      return response.data;
    } catch (error) {
      console.error('토큰 가져오기 오류:', error);
    }
  };

  const joinSession = async () => {
    OV.current = new OpenVidu();
    const mySession = OV.current.initSession();

    mySession.on('streamCreated', event => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers(prevSubscribers => [...prevSubscribers, subscriber]);
    });

    mySession.on('streamDestroyed', event => {
      setSubscribers(prevSubscribers =>
        prevSubscribers.filter(sub => sub !== event.stream.streamManager)
      );
    });

    mySession.on('exception', (exception) => {
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
        resolution: '640x480',
        frameRate: 30,
        insertMode: 'APPEND',
        mirror: false,
      });

      mySession.publish(newPublisher);

      setSession(mySession);
      setPublisher(newPublisher);
      setSessionId(sessionId);
    } catch (error) {
      console.error('세션 연결 오류:', error);
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
    setIsVideoConferenceActive(prev => !prev);
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  const openShareModal = () => {
    setIsShareModalOpen(true);
    

    getMyPhotocards().then((photocard)=>{
      console.log(photocard);
      setPhotoCards(photocard);
    })
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  const handleShare = (selectedItems) => {
    //setSharedItems(selectedItems);
    closeShareModal();
    session.signal({
      data: JSON.stringify({ type: 'share', items: selectedItems }),
      to: [], // Broadcast to all participants
      type: 'share'
    }).catch(error => console.error('Error sending signal:', error));
  };

  const toggleMic = () => {
    setIsMicOn(prevState => {
      const newMicState = !prevState;
      if (publisher) {
        publisher.publishAudio(newMicState);

        session.signal({
          data: JSON.stringify({ type: 'mic', state: newMicState }),
          to: [], // Broadcast to all participants
          type: 'micStatus'
        }).catch(error => console.error('Error sending signal:', error));
      }
      return newMicState;
    });
  };

  const toggleVideo = () => {
    setIsVideoOn(prevState => {
      const newVideoState = !prevState;
      if (publisher) {
        // const mediaStream = publisher.stream.getMediaStream();
        // mediaStream.getVideoTracks().forEach(track => track.enabled = newVideoState);
        publisher.publishVideo(newVideoState);  
  
        // session.signal({
        //   data: JSON.stringify({ type: 'video', state: newVideoState }),
        //   to: [], // Broadcast to all participants
        //   type: 'videoStatus'
        // }).catch(error => console.error('Error sending signal:', error));
      }
      return newVideoState;
    });
  };

  const isIShared = (item) => {
    // item.memberId와 user.id를 비교하여 버튼 렌더링 여부 결정
    return item.memberId === user.id ? (
      <span>
        <button onClick={() => {
          stopSharing(item.id)
          
        }}>
          공유해제
        </button>
      </span>
    ) : null;
  };
  const stopSharing = (itemId) => {
    
    //setSharedItems(sharedItems.filter(item => item.id !== itemId));
    session.signal({
      data: JSON.stringify({ type: 'stopshare', itemId: itemId }),
      to: [], // Broadcast to all participants
      type: 'stopshare'
    }).catch(error => console.error('Error sending signal:', error));
  }

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
            {isVideoConferenceActive ? '화상회의가 진행중입니다' : '화상회의를 종료했습니다'}
          </p>
          <button 
            onClick={toggleVideoConference}
            className={`px-4 py-2 rounded-full shadow-lg text-lg ${isVideoConferenceActive ? 'bg-red-500' : 'bg-green-500'} text-black`}
          >
            {isVideoConferenceActive ? '화상회의 종료' : '화상회의 참여'}
          </button>
        </div>
      )}

      {isVideoConferenceActive && (
        <div className="flex-grow bg-[#F5F5F5] rounded-lg p-4 mb-4 flex">
          <div className={`flex-grow ${isChatOpen ? 'w-3/4' : 'w-full'}`}>
            <div className={`grid gap-2 mb-4 ${sharedItems.length > 0 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-2 h-full p-12'}`}>
              {sharedItems.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                  <img src={item.photocardImage} alt={item.photocardText} className="w-full h-32 object-cover" />
                  <p className="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 px-1 py-0.5 rounded text-xs">{item.photocardText}</p>
                  {isIShared(item)}
                </div>
              ))}
              {publisher && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
                  <video autoPlay={true} ref={(video) => video && publisher.addVideoElement(video)} />
                  <p className="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 px-1 py-0.5 rounded text-xs">{JSON.parse(publisher.stream.connection.data).clientData}</p>
                  <p className="absolute bottom-1 right-1 text-white bg-black bg-opacity-50 px-1 py-0.5 rounded text-xs"> {isMicOn ? 'Mic On' : 'Mic Off'}</p>
                </div>
              )}
              {subscribers.map((sub, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                  <video autoPlay={true} ref={(video) => video && sub.addVideoElement(video)} />
                  <p className="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 px-1 py-0.5 rounded text-xs">{JSON.parse(sub.stream.connection.data).clientData}</p>
                  <p className="absolute bottom-1 right-1 text-white bg-black bg-opacity-50 px-1 py-0.5 rounded text-xs"> {sub.stream.audioActive ? 'Mic On' : 'Mic Off'}</p>
                </div>
              ))}
            </div>
          </div>
          {isChatOpen && (
            <div className="w-1/4 ml-4 bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-bold mb-2">채팅</h2>
              {/* 채팅 내용과 입력 필드를 여기에 추가 */}
            </div>
          )}
        </div>
      )}

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {isRoomCreated && (
          <>
            <button 
              onClick={toggleVideoConference}
              className={`px-3 py-1 rounded-full shadow-lg text-sm ${isVideoConferenceActive ? 'bg-red-500' : 'bg-green-500'} text-black`}
            >
              {isVideoConferenceActive ? '화상회의 종료' : '화상회의 참여'}
            </button>
            <button 
              onClick={openShareModal}
              className="bg-blue-500 text-black px-3 py-1 rounded-full shadow-lg text-sm"
              >
              공유하기
            </button>
            <button 
              onClick={toggleChat}
              className="bg-purple-500 text-black px-3 py-1 rounded-full shadow-lg text-sm"
            >
              채팅
            </button>
            <button 
              onClick={toggleMic}
              className="bg-blue-500 text-black px-3 py-1 rounded-full shadow-lg text-sm"
            >
              {isMicOn ? '마이크 off' : '마이크 on'}
            </button>
            <button 
              onClick={toggleVideo}
              className="bg-blue-500 text-black px-3 py-1 rounded-full shadow-lg text-sm"
            >
              {isVideoOn ? '카메라 off' : '카메라 on'}
                                     </button>
          </>
        )}
      </div>

      {isShareModalOpen && (
        <ShareModal onClose={closeShareModal} onShare={handleShare} photoCards = {photoCards} />
      )}
    </div>
  );
};

const ShareModal = ({ onClose, onShare, photoCards }) => {

  const [selectedItems, setSelectedItems] = useState([]);
  const handleItemSelect = (item) => {
    setSelectedItems(prevSelectedItems =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter(i => i !== item)
        : [...prevSelectedItems, item]
    );
  };

  const handleShareClick = () => {
    onShare(selectedItems);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-2">공유하기</h2>
        <div className="grid gap-2 mb-4 grid-cols-2">
         {photoCards && photoCards.map(card => (
            <div key={card.photocardId} className="bg-white rounded-lg shadow-md overflow-hidden relative">
              <img src={card.photocardImage} alt={card.photocardText} className="w-full h-32 object-cover" />
              <p className="absolute bottom-1 left-1 text-black bg-black bg-opacity-50 px-1 py-0.5 rounded text-xs">{card.text}</p>
              <input
                type="checkbox"
                className="absolute top-1 right-1"
                onChange={() => handleItemSelect(card)}
                checked={selectedItems.includes(card)}
              />
            </div>
          ))} 
        </div>
        <button 
          onClick={handleShareClick}
          className="px-4 py-2 bg-blue-500 text-black rounded-full shadow-lg"
        >
          공유하기
        </button>
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-black rounded-full shadow-lg ml-2"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default ActivityRTC;
