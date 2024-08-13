import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import useUserStore from "../store/userStore"; // userStore import

Modal.setAppElement("#root"); // Modal 접근성을 위한 설정

const Timecapsule = () => {
  const { user } = useUserStore(); // user 정보를 가져옴
  const memberId = user.id; // user의 id를 memberId로 설정

  const [unreadAlarmsCount, setUnreadAlarmsCount] = useState(0);
  const [alarms, setAlarms] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 로그인 후 알람 개수 불러오기
    const fetchUnreadCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/timecapsule/${memberId}/alarm/unread-count`);
        setUnreadAlarmsCount(response.data);
        console.log("Unread Alarm Count:", response.data); // Log the unread alarm count
      } catch (error) {
        console.error("Failed to fetch unread alarm count:", error);
      }
    };

    fetchUnreadCount();
  }, [memberId]);

  const handleIconClick = async () => {
    if (!isDropdownOpen) {
      try {
        const response = await axios.get(`http://localhost:8080/api/timecapsule/${memberId}/alarm`);
        setAlarms(response.data);
        setUnreadAlarmsCount(response.data.filter(alarm => !alarm.isRead).length);
        setIsDropdownOpen(true);
      } catch (error) {
        console.error("Failed to fetch alarms:", error);
      }
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleAlarmClick = async (timeCapsuleId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/timecapsule/${timeCapsuleId}`);
      setSelectedCapsule(response.data);
      setIsModalOpen(true);
      // 특정 알람을 클릭하면 해당 알람을 읽음 처리할 수 있습니다.
      setUnreadAlarmsCount(prevCount => prevCount - 1);
    } catch (error) {
      console.error("Failed to fetch time capsule details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCapsule(null);
    setIsDropdownOpen(false); // 모달을 닫을 때 드롭다운도 닫음
  };

  // 날짜 간의 차이를 일수로 계산하는 함수
  const calculateDaysAgo = (startDate) => {
    const start = new Date(startDate);
    const now = new Date();
    const differenceInTime = now.getTime() - start.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  return (
    <div className="relative">
       <div className="cursor-pointer flex items-center relative" onClick={handleIconClick}>
        <span className="text-2xl">⏳</span>
        {unreadAlarmsCount > 0 && (
            <span className="notification-dot"></span>
        )}
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-[20rem] bg-white shadow-lg rounded-lg z-10">
          {alarms.length === 0 ? (
            <div className="p-4 text-center">No new alarms</div>
          ) : (
            <ul className="p-2">
              {alarms.map((alarm) => (
                <li
                  key={alarm.timeCapsuleId}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center ${
                    alarm.isRead ? "text-gray-500" : "text-black font-bold"
                  }`}
                  onClick={() => handleAlarmClick(alarm.timeCapsuleId)}
                >
                  {`Time Capsule from ${alarm.createdDate}`}
                  {!alarm.isRead && (
                    <span className="ml-2 bg-red-500 w-3 h-3 rounded-full"></span> // 빨간 점 표시
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {isModalOpen && selectedCapsule && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Time Capsule Details"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            },
            content: {
              maxWidth: "600px",
              maxHeight: "80vh", // 모달의 최대 높이 설정
              margin: "auto",
              padding: "30px",
              borderRadius: "20px",
              backgroundColor: "#f9f7fd",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
              border: "2px solid #e1e1e1",
              position: "relative",
              fontFamily: "'Comic Sans MS', cursive, sans-serif",
              overflowY: "auto", // 세로 스크롤바 추가
            },
          }}
        >
          <h2 className="text-2xl font-bold mb-6 text-purple-600 text-center">
            🎁 <span>{user.nickname}</span> 님의 <span>{calculateDaysAgo(selectedCapsule.timeCapsuleDate.startDate)}</span>일전 기록 🎁
          </h2>

          <div className="mb-6">
            <h3 className="font-semibold text-lg text-pink-600 mb-4">📚 Reviews:</h3>
            <ul className="list-disc pl-5">
              {selectedCapsule.reviews.map((review) => (
                <li key={review.reviewId} className="mb-4">
                  <p className="font-semibold">{review.bookTitle}</p>
                  <img src={review.bookImage} alt={review.bookTitle} className="w-40 h-40 mt-2 rounded-lg shadow-md"/>
                  <p className="mt-2">{review.reviewText}</p>
                  <p className="text-sm text-gray-500">{calculateDaysAgo(review.createdDate)}일 전</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-pink-600 mb-4">📸 Photo Cards:</h3>
            <ul className="list-disc pl-5">
              {selectedCapsule.photoCards.map((photoCard) => (
                <li key={photoCard.photoCardId} className="mb-4">
                  <p className="font-semibold">{photoCard.bookTitle}</p>
                  <img src={photoCard.photoCardImage} alt={photoCard.bookTitle} className="w-40 h-40 mt-2 rounded-lg shadow-md"/>
                  <p className="mt-2">{photoCard.photoCardText}</p>
                  <p className="text-sm text-gray-500">{calculateDaysAgo(photoCard.photoCardCreatedDate)}일 전</p>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-white bg-pink-500 hover:bg-pink-600 rounded-full w-10 h-10 flex items-center justify-center shadow-md focus:outline-none"
          >
            ✖
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Timecapsule;
