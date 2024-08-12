package com.ssafy.readly.service.follower;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class SseEmitterService {

    private static final long TIMEOUT = 30 * 60 * 1000L; // 30분 타임아웃 설정
    private final Map<String, SseEmitter> emitters = new HashMap<>();

    public SseEmitter subscribe(String userId) {
        SseEmitter emitter = new SseEmitter(TIMEOUT); // 30분 타임아웃 설정
        emitters.put(userId, emitter);

        emitter.onCompletion(() -> emitters.remove(userId));
        emitter.onTimeout(() -> handleTimeout(userId));
        emitter.onError((ex) -> handleError(userId));

        return emitter;
    }

    private void handleTimeout(String userId) {
        emitters.remove(userId);
        // 클라이언트에게 재연결을 권장하는 메시지를 보낼 수 있습니다.
        System.out.println("Connection timed out for user: " + userId);
    }

    private void handleError(String userId) {
        emitters.remove(userId);
        // 오류 처리 로직을 추가할 수 있습니다.
        System.out.println("Error occurred for user: " + userId);
    }

    public void sendNotification(String userId, String message) {
        SseEmitter emitter = emitters.get(userId);
        if (emitter != null) {
            try {
                System.out.println("Sending notification to user: " + userId); // 로그 추가
                emitter.send(SseEmitter.event().name("follow-notification").data(message));
            } catch (IOException e) {
                emitters.remove(userId);
                System.out.println("Failed to send notification to user: " + userId + " due to " + e.getMessage()); // 오류 로그 추가
            }
        } else {
            System.out.println("No emitter found for user: " + userId); // 로그 추가
        }
    }
}
