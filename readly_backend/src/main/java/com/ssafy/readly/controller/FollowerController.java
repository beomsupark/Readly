package com.ssafy.readly.controller;

import com.ssafy.readly.dto.follower.RequestFollowerDto;
import com.ssafy.readly.service.follower.FollowerService;
import com.ssafy.readly.service.follower.SseEmitterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/follower")
public class FollowerController {

    private final FollowerService followerService;
    private final SseEmitterService sseEmitterService;

    @PostMapping()
    public ResponseEntity<?> addFollower(@RequestBody RequestFollowerDto requestFollowerDto) throws Exception {
        followerService.addFollower(requestFollowerDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteFollower(@RequestBody RequestFollowerDto requestFollowerDto) throws Exception {
        followerService.deleteFollower(requestFollowerDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/subscribe/{userId}")
    public SseEmitter subscribeToNotifications(@PathVariable String userId) {
        return sseEmitterService.subscribe(userId);
    }


}
