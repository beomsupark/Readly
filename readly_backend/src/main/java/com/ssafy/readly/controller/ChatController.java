package com.ssafy.readly.controller;

import com.ssafy.readly.dto.chat.ChatMessage;
import com.ssafy.readly.repository.chat.ChatMessageRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final ChatMessageRepositoryImpl chatMessageRepositoryImpl;

    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        chatMessageRepositoryImpl.saveChatMessage(message);
        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }
}
