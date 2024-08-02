package com.ssafy.readly.service.chat;

import com.ssafy.readly.dto.chat.MessageDto;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class RedisPublisher {

    private final RedisTemplate<String, MessageDto> template;

    public RedisPublisher(RedisTemplate<String, MessageDto> template) {
        this.template = template;
    }

    public void publish(ChannelTopic topic, MessageDto dto) {
        template.convertAndSend(topic.getTopic(), dto);
        saveMessageToRoom(topic.getTopic(), dto);
    }

    private void saveMessageToRoom(String roomId, MessageDto message) {
        template.opsForList().rightPush(roomId, message);
    }

    public List<MessageDto> getMessagesFromRoom(String roomId) {
        return template.opsForList().range(roomId, 0, -1);
    }
}
