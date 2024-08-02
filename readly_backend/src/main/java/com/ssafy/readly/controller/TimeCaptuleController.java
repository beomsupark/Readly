package com.ssafy.readly.controller;

import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.review.ReviewResponse;
import com.ssafy.readly.dto.timecapsule.TimeCapsuleRequest;
import com.ssafy.readly.service.timecapsule.TimeCapsuleServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TimeCaptuleController {

    private final TimeCapsuleServiceImpl timeCapsuleService;

    @PostMapping("/timecapsule/cards")
    public ResponseEntity<Map<String, Object>> getCards(@RequestBody TimeCapsuleRequest timeCapsuleRequest) throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        List<ReviewResponse> reviews = timeCapsuleService.getReviewsByPeriod(timeCapsuleRequest);
        List<CreatePhotoCardResponse> photoCards = timeCapsuleService.getPhotoCardsByPeriod(timeCapsuleRequest);
        responseMap.put("reviews", reviews);
        responseMap.put("photoCards", photoCards);
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }

    @PostMapping("/timecapsule")
    public ResponseEntity<?> createTimecapsule(@RequestBody TimeCapsuleRequest timeCapsuleRequest) throws Exception {
        timeCapsuleService.saveTimeCapsule(timeCapsuleRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
