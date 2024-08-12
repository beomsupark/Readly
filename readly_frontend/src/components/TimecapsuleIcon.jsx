import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import useUserStore from "../store/userStore"; // userStore import

Modal.setAppElement("#root"); // Modal 접근성을 위한 설정

const Timecapsule = () => {
  const { user } = useUserStore(); // user 정보를 가져옴
  const memberId = user.id; // user의 id를 memberId로 설정

  const [alarmCount, setAlarmCount] = useState(0);
  const [alarms, setAlarms] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 로그인 후 알람 개수 불러오기
    const fetchUnreadCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/timecapsule/${memberId}/alarm/unread-count`);
        setAlarmCount(response.data.alarmCount);
      } catch (error) {
        console.error("Failed to fetch unread alarm count:", error);
      }
    };

    fetchUnreadCount();
  }, [memberId]);

  const handleIconClick = async () => {
    setIsDropdownOpen(!isDropdownOpen);

    if (!isDropdownOpen) {
      try {
        const response = await axios.get(`http://localhost:8080/api/timecapsule/${memberId}/alarm`);
        setAlarms(response.data);
      } catch (error) {
        console.error("Failed to fetch alarms:", error);
      }
    }
  };

  const handleAlarmClick = async (timeCapsuleId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/timecapsule/${timeCapsuleId}`);
      setSelectedCapsule(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch time capsule details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCapsule(null);
  };

  return (
    <div className="relative">
      <div className="cursor-pointer flex items-center" onClick={handleIconClick}>
        <span className="text-2xl">⏳</span>
        {alarmCount > 0 && (
          <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-1">
            {alarmCount}
          </span>
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
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    alarm.isRead ? "text-gray-500" : "text-black font-bold"
                  }`}
                  onClick={() => handleAlarmClick(alarm.timeCapsuleId)}
                >
                  {`Time Capsule from ${alarm.createdDate}`}
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
              margin: "auto",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.25)",
            },
          }}
        >
          <h2 className="text-xl font-bold mb-4">Time Capsule Details</h2>
          <div className="mb-4">
            <h3 className="font-semibold">Dates:</h3>
            <p>
              Start: {selectedCapsule.timeCapsuleDate.startDate} - End: {selectedCapsule.timeCapsuleDate.endDate}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold">Reviews:</h3>
            <ul className="list-disc pl-5">
              {selectedCapsule.reviews.map((review) => (
                <li key={review.reviewId}>
                  <p className="font-semibold">{review.bookTitle} by {review.bookAuthor}</p>
                  <p>{review.reviewText}</p>
                  <p className="text-sm text-gray-500">{review.createdDate}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Photo Cards:</h3>
            <ul className="list-disc pl-5">
              {selectedCapsule.photoCards.map((photoCard) => (
                <li key={photoCard.photoCardId}>
                  <p className="font-semibold">{photoCard.bookTitle} by {photoCard.bookAuthor}</p>
                  <p>{photoCard.photoCardText}</p>
                  <img src={photoCard.photoCardImage} alt={photoCard.bookTitle} className="w-16 h-16 mt-2"/>
                  <p className="text-sm text-gray-500">{photoCard.photoCardCreatedDate}</p>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={closeModal}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Timecapsule;
