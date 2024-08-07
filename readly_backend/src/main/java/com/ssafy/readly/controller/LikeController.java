package com.ssafy.readly.controller;

import com.ssafy.readly.dto.like.LikeRequest;
import com.ssafy.readly.service.like.LikeServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LikeController {
    private final LikeServiceImpl likeService;

    @PostMapping("like")
    public ResponseEntity<?> like(@RequestBody LikeRequest request) {
        likeService.like(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
