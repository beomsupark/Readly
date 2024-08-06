package com.ssafy.readly.dto.chat;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.util.UUID;

@RedisHash("ChatMessage")
public class ChatMessage {

    @Id
    private String id;
    private String roomId;
    private String from;
    private String content;

    public ChatMessage() {
        this.id = UUID.randomUUID().toString();
    }

    public ChatMessage(String roomId, String from, String content) {
        this();
        this.roomId = roomId;
        this.from = from;
        this.content = content;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
