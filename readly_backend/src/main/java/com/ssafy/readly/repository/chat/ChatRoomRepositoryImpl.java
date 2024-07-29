package com.ssafy.readly.repository.chat;

import com.ssafy.readly.dto.chat.ChatRoom;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;
import java.util.*;

@RequiredArgsConstructor
@Repository
public class ChatRoomRepositoryImpl implements ChatRoomRepository {

    private final RedisTemplate<String, Object> redisTemplate;

    public String createChatRoom(String groupId) {
        ChatRoom chatRoom = ChatRoom.create(groupId);
        redisTemplate.opsForValue().set("CHAT_ROOM_" + chatRoom.getRoomId(), chatRoom);
        return chatRoom.getRoomId(); // 생성된 roomId 반환
    }
}
