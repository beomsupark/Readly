package com.ssafy.readly.repository.chat;

import com.ssafy.readly.dto.chat.ChatMessage;
import com.ssafy.readly.dto.chat.ChatRoom;

import java.util.List;


public interface ChatRoomRepository {

    String createChatRoom(String groupId) throws Exception;

}
