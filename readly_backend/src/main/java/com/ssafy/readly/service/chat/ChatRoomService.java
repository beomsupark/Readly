package com.ssafy.readly.service.chat;

import com.ssafy.readly.dto.chat.ChatMessage;

import java.util.List;

public interface ChatRoomService {
    String createChatRoom(String groupId) throws Exception;

    List<ChatMessage> findAllMessages(String roomId) throws Exception;
}
