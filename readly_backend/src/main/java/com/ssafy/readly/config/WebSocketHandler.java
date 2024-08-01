package com.ssafy.readly.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.readly.dto.chat.MessageDto;
import com.ssafy.readly.service.chat.RedisPublisher;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.Map;

@Component
public class WebSocketHandler extends TextWebSocketHandler {

    private final RedisPublisher redisPublisher;
    private final ObjectMapper objectMapper;
    private final Map<String, WebSocketSession> sessions = new HashMap<>();

    public WebSocketHandler(RedisPublisher redisPublisher, ObjectMapper objectMapper) {
        this.redisPublisher = redisPublisher;
        this.objectMapper = objectMapper;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.put(session.getId(), session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        MessageDto messageDto = objectMapper.readValue(message.getPayload(), MessageDto.class);
        redisPublisher.publish(new ChannelTopic(messageDto.getRoomId()), messageDto);
    }

    public void sendMessageToAll(String roomId, MessageDto messageDto) throws JsonProcessingException {
        TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(messageDto));
        sessions.values().forEach(session -> {
            try {
                session.sendMessage(textMessage);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session.getId());
    }
}
