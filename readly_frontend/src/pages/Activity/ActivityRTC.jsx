import { useState, useEffect, useRef } from 'react';
import { OpenVidu } from 'openvidu-browser';

const dummyPhotoCards = [
  { id: 1, imageUrl: "https://example.com/image1.jpg", text: "내가 만든 포토카드" },
  { id: 2, imageUrl: "https://example.com/image2.jpg", text: "내가 남긴 한줄평" },
  { id: 3, imageUrl: "https://example.com/image3.jpg", text: "추억의 포토카드" },
  { id: 4, imageUrl: "https://example.com/image4.jpg", text: "오늘의 한줄평" },
];

const ActivityRTC = () => {
  const [isVideoConferenceActive, setIsVideoConferenceActive] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharedItems, setSharedItems] = useState([]);
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [isRoomCreated, setIsRoomCreated] = useState(false);
  const OV = useRef(null);

  useEffect(() => {
    if (isVideoConferenceActive) {
      joinSession();
    } else {
      leaveSession();
    }
  }, [isVideoConferenceActive]);

  // 임시 토큰 반환 함수
  const getToken = async () => {
    // 실제 환경에서는 서버로부터 토큰을 받아와야 합니다.
    // 여기서는 테스트 목적으로 하드코딩된 토큰을 반환합니다.
    return 'YOUR_TEST_TOKEN';
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

    try {
      const token = await getToken();
      await mySession.connect(token);

      const newPublisher = await OV.current.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: '640x480',
        frameRate: 30,
        insertMode: 'APPEND',
        mirror: false,
      });

      mySession.publish(newPublisher);
      setSession(mySession);
      setPublisher(newPublisher);
    } catch (error) {
      console.error('Error connecting to the session:', error.code, error.message);
    }
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }
    setSession(null);
    setPublisher(null);
    setSubscribers([]);
    OV.current = null;
  };

  const toggleVideoConference = () => {
    if (isVideoConferenceActive) {
      leaveSession();
      setIsVideoConferenceActive(false); // 상태 업데이트를 명시적으로 합니다.
    } else {
      setIsRoomCreated(true);
      setIsVideoConferenceActive(true); // 상태 업데이트를 명시적으로 합니다.
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const openShareModal = () => {
    setIsShareModalOpen(true);
  };

  const closeShareModal = () => {
    setIsShareModalOpen(false);
  };

  const handleShare = (selectedItems) => {
    setSharedItems(selectedItems);
    closeShareModal();
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
            {isVideoConferenceActive ? '화상회의가 진행중입니다' : '화상회의를 종료했습니다'}
          </p>
          <button 
            onClick={toggleVideoConference}
            className={`px-4 py-2 rounded-full shadow-lg text-lg ${isVideoConferenceActive ? 'bg-red-500' : 'bg-green-500'} text-white`}
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
                  <img src={item.imageUrl} alt={item.text} className="w-full h-32 object-cover" />
                  <p className="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 px-1 py-0.5 rounded text-xs">{item.text}</p>
                </div>
              ))}
              {publisher && (
                <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
                  <video autoPlay={true} ref={(video) => video && publisher.addVideoElement(video)} />
                  <p className="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 px-1 py-0.5 rounded text-xs">You</p>
                </div>
              )}
              {subscribers.map((sub, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden relative">
                  <video autoPlay={true} ref={(video) => video && sub.addVideoElement(video)} />
                  <p className="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 px-1 py-0.5 rounded text-xs">Participant {index + 1}</p>
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
              className={`px-3 py-1 rounded-full shadow-lg text-sm ${isVideoConferenceActive ? 'bg-red-500' : 'bg-green-500'} text-white`}
            >
              {isVideoConferenceActive ? '화상회의 종료' : '화상회의 참여'}
            </button>
            <button 
              onClick={openShareModal}
              className="bg-blue-500 text-white px-3 py-1 rounded-full shadow-lg text-sm"
            >
              공유하기
            </button>
            <button 
              onClick={toggleChat}
              className="bg-purple-500 text-white px-3 py-1 rounded-full shadow-lg text-sm"
            >
              채팅
            </button>
          </>
        )}
      </div>

      {isShareModalOpen && (
        <ShareModal onClose={closeShareModal} onShare={handleShare} photoCards={dummyPhotoCards} />
      )}
    </div>
  );
};

const ShareModal = ({ onClose, onShare, photoCards }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-3/4 max-w-md">
        <h2 className="text-lg font-bold mb-4">공유할 항목 선택</h2>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {photoCards.map(card => (
            <div 
              key={card.id} 
              className={`border rounded-lg p-2 cursor-pointer ${selectedItems.includes(card) ? 'border-blue-500' : 'border-gray-300'}`}
              onClick={() => toggleItem(card)}
            >
              <img src={card.imageUrl} alt={card.text} className="w-full h-24 object-cover rounded-md mb-2" />
              <p className="text-sm text-center">{card.text}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            취소
          </button>
          <button 
            onClick={() => onShare(selectedItems)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            공유
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityRTC;
