package com.ssafy.readly.repository.chat;

import com.ssafy.readly.dto.chat.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Repository
public class ChatMessageRepositoryImpl implements ChatMessageRepository{
    private final RedisTemplate<String, Object> redisTemplate;

    public void saveChatMessage(ChatMessage message) {
        redisTemplate.opsForList().rightPush("CHAT_MESSAGE_" + message.getRoomId(), message);
    }

    public List<ChatMessage> findAllMessages(String roomId) {
        return redisTemplate.opsForList().range("CHAT_MESSAGE_" + roomId, 0, -1).stream()
                .map(obj -> (ChatMessage) obj)
                .collect(Collectors.toList());
    }
}
