import { useState, useEffect } from "react";
import axios from "axios";
import useUserStore from "../store/userStore";

const NotificationIcon = ({ initialNotifications = [] }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const { user } = useUserStore();

  const fetchUnreadNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/notifications/unread/${user.id}`);
      const notificationsData = Array.isArray(response.data) ? response.data : [];
      setNotifications(notificationsData);
    } catch (error) {
      console.error("Failed to fetch unread notifications:", error);
      setNotifications([]); // 에러 발생 시 빈 배열로 초기화
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await axios.post(`http://localhost:8080/api/notifications/mark-as-read/${user.id}/${notificationId}`);
      // 상태에서 읽은 알림을 제거
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== notificationId)
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const toggleNotifications = async () => {
    setShowNotifications((prev) => !prev);
    if (!showNotifications && user && user.id) {
      await fetchUnreadNotifications(); // 알림 아이콘을 눌렀을 때마다 알림을 가져옴
    }
  };

  const handleNotificationClick = async (notificationId) => {
    await markNotificationAsRead(notificationId);
  };

  useEffect(() => {
    if (user && user.id) {
      const eventSource = new EventSource(`http://localhost:8080/api/follower/subscribe/${user.id}`);

      eventSource.addEventListener("follow-notification", function (event) {
        console.log("Notification received: ", event.data);

        // 새 알림을 추가하고 상태 업데이트
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          { id: new Date().getTime(), message: event.data }, // 임시 ID와 메시지를 추가
        ]);
      });

      eventSource.onerror = function (err) {
        console.error("SSE 연결 오류:", err);
        eventSource.close(); // 오류가 발생하면 SSE 연결을 닫습니다.
      };

      return () => {
        eventSource.close(); // 컴포넌트가 언마운트될 때 SSE 연결을 닫습니다.
      };
    }
  }, [user]);

  return (
    <div className="relative">
      <div className="notification-icon cursor-pointer" onClick={toggleNotifications}>
        🔔 {/* 아이콘 */}
        {notifications.length > 0 && (
          <span className="notification-count bg-red-500 text-white rounded-full px-2 text-xs">
            {notifications.length}
          </span>
        )}
      </div>
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50">
          {Array.isArray(notifications) && notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 border-b cursor-pointer"
                onClick={() => handleNotificationClick(notification.id)}
              >
                {notification.message}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">No new notifications</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
