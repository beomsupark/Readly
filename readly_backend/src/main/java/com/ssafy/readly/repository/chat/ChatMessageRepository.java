package com.ssafy.readly.repository.chat;

import com.ssafy.readly.dto.chat.ChatMessage;

import java.util.List;
import java.util.stream.Collectors;

public interface ChatMessageRepository {
    void saveChatMessage(ChatMessage message) throws Exception;

    List<ChatMessage> findAllMessages(String roomId) throws Exception;
}
