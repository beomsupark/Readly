package com.ssafy.readly.service.chat;

import com.ssafy.readly.dto.chat.MessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RedisPubService {

    private final RedisMessageListenerContainer redisMessageListenerContainer;
    private final RedisPublisher redisPublisher;
    private final RedisSubscribeListener redisSubscribeListener;

    public void pubMsgChannel(String channel, MessageDto message) {
        redisPublisher.publish(new ChannelTopic(channel), message);
    }

    public void cancelSubChannel(String channel) {
        redisMessageListenerContainer.removeMessageListener(redisSubscribeListener, new ChannelTopic(channel));
    }

    public void subscribeChannel(String channel) {
        redisMessageListenerContainer.addMessageListener(redisSubscribeListener, new ChannelTopic(channel));
    }

    public List<MessageDto> getMessagesFromRoom(String roomId) {
        return redisPublisher.getMessagesFromRoom(roomId);
    }
}