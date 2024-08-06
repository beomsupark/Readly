package com.ssafy.readly.controller;

import com.ssafy.readly.dto.chat.ChatMessage;
import com.ssafy.readly.dto.chat.HistoryRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.HtmlUtils;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ChatController {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat")
    public void send(ChatMessage message) throws Exception {
        Thread.sleep(1000); // simulated delay
        String roomId = HtmlUtils.htmlEscape(message.getRoomId());
        String from = HtmlUtils.htmlEscape(message.getFrom());
        String content = HtmlUtils.htmlEscape(message.getContent());

        ChatMessage savedMessage = new ChatMessage(roomId, from, content);
        redisTemplate.opsForHash().put("chatRoom:" + roomId, savedMessage.getId(), savedMessage);

        messagingTemplate.convertAndSend("/topic/messages/" + roomId, savedMessage);
    }

    @MessageMapping("/history")
    @PostMapping("/history")
    public List<ChatMessage> fetchHistory(@RequestBody HistoryRequest request) throws Exception {
        String roomId = HtmlUtils.htmlEscape(request.getRoomId());
        List<Object> messages = redisTemplate.opsForHash().values("chatRoom:" + roomId);
        System.out.println("Fetching history for room: " + roomId);
        return messages.stream()
                .map(obj -> (ChatMessage) obj)
                .collect(Collectors.toList());
    }
}
