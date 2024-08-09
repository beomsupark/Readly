package com.ssafy.readly.controller;

import com.ssafy.readly.entity.Notification;
import com.ssafy.readly.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/unread/{memberId}")
    public ResponseEntity<List<Notification>> getUnreadNotifications(@PathVariable int memberId) {
        try {
            List<Notification> unreadNotifications = notificationService.getUnreadNotifications(memberId);
            return new ResponseEntity<>(unreadNotifications, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/mark-as-read/{memberId}/{notificationId}")
    public ResponseEntity<?> markNotificationAsRead(@PathVariable int memberId, @PathVariable int notificationId) {
        try {
            notificationService.markNotificationsAsRead(memberId, notificationId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}