package com.ssafy.readly.service.timecapsule;

import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.review.ReviewResponse;
import com.ssafy.readly.dto.timecapsule.CardsRequest;
import com.ssafy.readly.repository.timecapsule.TimeCapsuleRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TimeCapsuleServiceImpl implements TimeCapsuleService {

    private final TimeCapsuleRepositoryImpl timeCapsuleRepository;

    @Override
    public List<ReviewResponse> getReviewsByPeriod(CardsRequest cardsRequest) {
        return timeCapsuleRepository.findByReviews(cardsRequest);
    }

    @Override
    public List<CreatePhotoCardResponse> getPhotoCardsByPeriod(CardsRequest cardsRequest) {
        return timeCapsuleRepository.findByPhotoCards(cardsRequest);
    }
}
