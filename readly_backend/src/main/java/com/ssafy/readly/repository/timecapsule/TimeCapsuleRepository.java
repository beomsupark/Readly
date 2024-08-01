package com.ssafy.readly.repository.timecapsule;

import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.review.ReviewResponse;
import com.ssafy.readly.dto.timecapsule.TimeCapsuleRequest;
import com.ssafy.readly.entity.PhotoCard;
import com.ssafy.readly.entity.Review;
import com.ssafy.readly.entity.TimeCapsule;

import java.util.List;

public interface TimeCapsuleRepository {
    List<ReviewResponse> findByReviewNoLike(TimeCapsuleRequest timeCapsuleRequest);
    List<CreatePhotoCardResponse> findByPhotoCardNoLike(TimeCapsuleRequest timeCapsuleRequest);
    void saveTimeCapsule(TimeCapsule timeCapsule);
    List<Review> findByReviewIn(Integer[] reviews);
    List<PhotoCard> findByPhotoCardIn(Integer[] photoCards);
}
