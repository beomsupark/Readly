package com.ssafy.readly.service.timecapsule;

import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.review.ReviewResponse;
import com.ssafy.readly.dto.timecapsule.TimeCapsuleRequest;

import java.util.List;

public interface TimeCapsuleService {
    List<ReviewResponse> getReviewsByPeriod(TimeCapsuleRequest timeCapsuleRequest);
    List<CreatePhotoCardResponse> getPhotoCardsByPeriod(TimeCapsuleRequest timeCapsuleRequest);
    void saveTimeCapsule(TimeCapsuleRequest timeCapsuleRequest);
}
