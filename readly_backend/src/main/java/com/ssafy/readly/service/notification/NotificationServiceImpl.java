package com.ssafy.readly.service.notification;

import com.ssafy.readly.entity.Notification;
import com.ssafy.readly.enums.IsRead;
import com.ssafy.readly.repository.notification.NotificationRepository;
import com.ssafy.readly.service.follower.SseEmitterService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Transactional
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final SseEmitterService sseEmitterService;

    @Override
    public void sendNotification(int memberId, String message) throws Exception {
        // 1. 알림을 데이터베이스에 저장
        Notification notification = new Notification(memberId, message);
        notificationRepository.save(notification);


        // 2. SSE를 통해 실시간 알림 전송
        sseEmitterService.sendNotification(String.valueOf(memberId), message);
    }

    @Override
    public List<Notification> getUnreadNotifications(int memberId) throws Exception {
        return notificationRepository.findByUserIdAndIsReadFalse(memberId);
    }

    @Override
    public void markNotificationsAsRead(int memberId, int notificationId) throws Exception {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new Exception("Notification not found"));

        if(notification.getMemberId() == memberId) {
            notification.setIsRead(IsRead.Y);
        }
    }
}
