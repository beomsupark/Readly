package com.ssafy.readly.repository.timecapsule;

import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.review.ReviewResponse;
import com.ssafy.readly.dto.timecapsule.TimeCapsuleAlarmResponse;
import com.ssafy.readly.entity.TimeCapsule;

import java.time.LocalDate;
import java.util.List;

public interface TimeCapsuleRepository {
    void saveTimeCapsule(TimeCapsule timeCapsule);
    List<TimeCapsuleAlarmResponse> findTimeCapsuleByReleaseDate(Integer memberId, LocalDate date);
    Long countByMemberId(Integer memberId);
    List<ReviewResponse> findByTimeCapsuleReviews(int timeCapsuleId);
    List<CreatePhotoCardResponse> findByTimeCapsulePhotoCards(int timeCapsuleId);
}
