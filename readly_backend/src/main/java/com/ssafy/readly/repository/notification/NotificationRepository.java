package com.ssafy.readly.repository.notification;

import com.ssafy.readly.entity.Notification;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository {
    List<Notification> findByUserIdAndIsReadFalse(int memberId) throws Exception;
    void markAsReadByUserId(int memberId) throws Exception;
    void save(Notification notification) throws Exception;
    Optional<Notification> findById(int notificationId);

}