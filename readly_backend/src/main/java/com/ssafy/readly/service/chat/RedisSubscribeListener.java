package com.ssafy.readly.service.chat;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.readly.config.WebSocketHandler;
import com.ssafy.readly.dto.chat.MessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
@Slf4j
public class RedisSubscribeListener implements MessageListener {

    private final WebSocketHandler webSocketHandler;
    private final ObjectMapper objectMapper;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String publishMessage = new String(message.getBody(), StandardCharsets.UTF_8);
            MessageDto messageDto = objectMapper.readValue(publishMessage, MessageDto.class);

            log.info("Redis Subscribe Channel: " + messageDto.getRoomId());
            log.info("Redis SUB Message: {}", publishMessage);

            // WebSocket을 통해 메시지를 전송합니다.
            webSocketHandler.sendMessageToAll(messageDto.getRoomId(), messageDto);
        } catch (JsonProcessingException e) {
            log.error("Error processing JSON message", e);
        }
    }
}
