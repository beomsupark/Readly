package com.ssafy.readly.controller;

import com.ssafy.readly.entity.Notification;
import com.ssafy.readly.service.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    public static Map<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();

    // 메시지 알림
    // 메시지 알림
    @GetMapping(value = "/subscribe/{userId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@PathVariable Long userId) throws Exception {
        SseEmitter sseEmitter = notificationService.subscribe(userId);
        return sseEmitter;
    }

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