package com.ssafy.readly.controller;

import com.ssafy.readly.dto.chat.ChatMessage;
import com.ssafy.readly.dto.chat.ChatRoom;
import com.ssafy.readly.dto.rank.GetRankUserResponse;
import com.ssafy.readly.repository.chat.ChatMessageRepository;
import com.ssafy.readly.repository.chat.ChatMessageRepositoryImpl;
import com.ssafy.readly.repository.chat.ChatRoomRepositoryImpl;
import com.ssafy.readly.service.chat.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatMessageRepository chatMessageRepository;

    @GetMapping("/room/enter/{roomId}/messages")
    public  ResponseEntity<?> getMessageHistory(@PathVariable String roomId) throws Exception {
        List<ChatMessage> chatMessages = chatMessageRepository.findAllMessages(roomId);
        return new ResponseEntity<>(chatMessages, HttpStatus.OK);
    }
}



