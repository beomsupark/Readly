package com.ssafy.readly.controller;

import com.ssafy.readly.dto.like.LikeRequest;
import com.ssafy.readly.service.like.LikeServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LikeController {
    private final LikeServiceImpl likeService;

    @PostMapping("/like")
    public ResponseEntity<?> like(@RequestBody LikeRequest request) {
        likeService.like(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/like")
    public ResponseEntity<?> unlike(@RequestBody LikeRequest request) {
        likeService.cancelLike(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}