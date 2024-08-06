package com.ssafy.readly.dto.chat;

public class HistoryRequest {
    private String roomId;

    public HistoryRequest() {
    }

    public HistoryRequest(String roomId) {
        this.roomId = roomId;
    }

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }
}
