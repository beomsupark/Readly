package com.ssafy.readly.service.notification;

import com.ssafy.readly.entity.Notification;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

public interface NotificationService {
    void sendNotification(int memberId, String message) throws Exception;
    List<Notification> getUnreadNotifications(int memberId) throws Exception;
    void markNotificationsAsRead(int memberId, int notificationId) throws Exception;

    SseEmitter subscribe(Long userId) throws Exception;
}