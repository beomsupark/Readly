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
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TimeCapsuleController {

    private final TimeCapsuleServiceImpl timeCapsuleService;

    @PostMapping("/items/date")
    public ResponseEntity<Map<String, Object>> getItems(@RequestBody TimeCapsuleRequest timeCapsuleRequest) throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        List<ReviewResponse> reviews = timeCapsuleService.getReviewsByPeriod(timeCapsuleRequest);
        List<CreatePhotoCardResponse> photoCards = timeCapsuleService.getPhotoCardsByPeriod(timeCapsuleRequest);

        if(reviews.size() + photoCards.size() == 0) {
            throw new NoSuchElementException("해당 기간의 아이템이 존재하지 않습니다.");
        }

        responseMap.put("reviews", reviews);
        responseMap.put("photoCards", photoCards);
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }

    @PostMapping("/timecapsule")
    public ResponseEntity<?> createTimeCapsule(@RequestBody TimeCapsuleRequest timeCapsuleRequest) throws Exception {
        timeCapsuleService.saveTimeCapsule(timeCapsuleRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/timecapsule/{timecapsuleid}")
    public ResponseEntity<Map<String, Object>> getTimeCapsuleItems(@PathVariable("timecapsuleid") int timeCapsuleId) throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        List<ReviewResponse> reviews = timeCapsuleService.getTimeCapsuleReviews(timeCapsuleId);
        List<CreatePhotoCardResponse> photoCards = timeCapsuleService.getTimeCapsulePhotoCards(timeCapsuleId);
        responseMap.put("reviews", reviews);
        responseMap.put("photoCards", photoCards);
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }
}
