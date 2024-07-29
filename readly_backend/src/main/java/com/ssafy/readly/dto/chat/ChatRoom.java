package com.ssafy.readly.dto.chat;

import lombok.Getter;
import lombok.Setter;
import java.util.UUID;

@Getter
@Setter
public class ChatRoom {
    private String roomId;
    private String groupId;

    public static ChatRoom create(String groupId) {
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.roomId = UUID.randomUUID().toString();
        chatRoom.groupId = groupId;
        return chatRoom;
    }
}

