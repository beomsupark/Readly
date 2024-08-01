package com.ssafy.readly.service.timecapsule;

import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.review.ReviewResponse;
import com.ssafy.readly.dto.timecapsule.CardsRequest;

import java.util.List;

public interface TimeCapsuleService {
    List<ReviewResponse> getReviewsByPeriod(CardsRequest cardsRequest);
    List<CreatePhotoCardResponse> getPhotoCardsByPeriod(CardsRequest cardsRequest);
}
