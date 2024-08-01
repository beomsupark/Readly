package com.ssafy.readly.controller;

import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.review.ReviewResponse;
import com.ssafy.readly.dto.timecapsule.CardsRequest;
import com.ssafy.readly.service.timecapsule.TimeCapsuleServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class TimeCaptuleController {

    private final TimeCapsuleServiceImpl timeCapsuleService;

    @PostMapping("/timecapsule/cards")
    public ResponseEntity<Map<String, Object>> getCards(@RequestBody CardsRequest cardsRequest) {
        Map<String, Object> responseMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            List<ReviewResponse> reviews = timeCapsuleService.getReviewsByPeriod(cardsRequest);
            List<CreatePhotoCardResponse> photoCards = timeCapsuleService.getPhotoCardsByPeriod(cardsRequest);
            responseMap.put("reviews", reviews);
            responseMap.put("photoCards", photoCards);
            status = HttpStatus.OK;
        } catch (Exception e) {
            responseMap.put("errorMessage", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }
}
