package com.ssafy.readly.controller;

import com.ssafy.readly.dto.chat.MessageDto;
import com.ssafy.readly.service.chat.RedisPubService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("api/redis/pubsub")
@CrossOrigin(origins = "http://localhost:5173") // 프론트엔드 서버의 주소
public class RedisPubSubController {

    private final RedisPubService redisSubscribeService;

    @GetMapping("/history")
    public ResponseEntity<List<MessageDto>> getMessages(@RequestParam String roomId) {
        try {
            log.info("Fetching messages for roomId: {}", roomId);
            List<MessageDto> messages = redisSubscribeService.getMessagesFromRoom(roomId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            log.error("Failed to fetch messages for roomId: {}", roomId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
