package com.ssafy.readly.scheduler;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class RedisSubscriber implements MessageListener {

    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            NotificationMessage notificationMessage = objectMapper.readValue(message.getBody(), NotificationMessage.class);
            messagingTemplate.convertAndSend("/timecapsule/notification", notificationMessage);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
