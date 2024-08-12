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

    private final Map<String, SseEmitter> emitters = new HashMap<>();

    public SseEmitter subscribe(String userId) {
        SseEmitter emitter = new SseEmitter(); // 30분 타임아웃 설정 30 * 60 * 1000L

        // 2. 연결
        try {
            emitter.send(SseEmitter.event().name("connect"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        emitters.put(userId, emitter);

        emitter.onCompletion(() -> emitters.remove(userId));
        emitter.onTimeout(() -> emitters.remove(userId));

        return emitter;
    }

    public void sendNotification(String userId, String message) {
        SseEmitter emitter = emitters.get(userId);
        if (emitter != null) {
            try {
                System.out.println("Sending notification to user: " + userId); // 로그 추가
                emitter.send(SseEmitter.event().name("follow-notification").data(message));
            } catch (IOException e) {
                emitters.remove(userId);
            }
        } else {
            System.out.println("No emitter found for user: " + userId); // 로그 추가
        }
    }

}
