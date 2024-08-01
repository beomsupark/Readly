package com.ssafy.readly.repository.timecapsule;

import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.review.ReviewResponse;
import com.ssafy.readly.dto.timecapsule.CardsRequest;

import java.util.List;

public interface TimeCapsuleRepository {
    List<ReviewResponse> findByReviews(CardsRequest cardsRequest);
    List<CreatePhotoCardResponse> findByPhotoCards(CardsRequest cardsRequest);
}
