package com.ssafy.readly.service.notification;

import com.ssafy.readly.controller.NotificationController;
import com.ssafy.readly.entity.Notification;
import com.ssafy.readly.enums.IsRead;
import com.ssafy.readly.repository.notification.NotificationRepository;
import com.ssafy.readly.service.follower.SseEmitterService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
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
        //sseEmitterService.sendNotification(String.valueOf(memberId), message);

        // 2. SSE를 통해 실시간 알림 전송
        notifyMessage(String.valueOf(memberId), message);

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


    // 메시지 알림
    public SseEmitter subscribe(Long userId) {

        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);

        try {
            sseEmitter.send(SseEmitter.event().name("connect"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        NotificationController.sseEmitters.put(userId, sseEmitter);

        sseEmitter.onCompletion(() -> NotificationController.sseEmitters.remove(userId));	// sseEmitter 연결이 완료될 경우
        sseEmitter.onTimeout(() -> NotificationController.sseEmitters.remove(userId));		// sseEmitter 연결에 타임아웃이 발생할 경우
        sseEmitter.onError((e) -> NotificationController.sseEmitters.remove(userId));		// sseEmitter 연결에 오류가 발생할 경우

        return sseEmitter;
    }


    public static void notifyMessage(String receiver, String message) {
        if (NotificationController.sseEmitters.containsKey(Long.parseLong(receiver))) {
            SseEmitter sseEmitterReceiver = NotificationController.sseEmitters.get(Long.parseLong(receiver));
            try {
                sseEmitterReceiver.send(SseEmitter.event().name("addMessage").data(message));
            } catch (Exception e) {
                NotificationController.sseEmitters.remove(Long.parseLong(receiver));
            }
        }
    }
}
