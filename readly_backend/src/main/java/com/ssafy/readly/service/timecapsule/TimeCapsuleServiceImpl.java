package com.ssafy.readly.service.timecapsule;

import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.review.ReviewResponse;
import com.ssafy.readly.dto.timecapsule.TimeCapsuleRequest;
import com.ssafy.readly.entity.*;
import com.ssafy.readly.enums.ItemType;
import com.ssafy.readly.repository.member.MemberRepositoryImpl;
import com.ssafy.readly.repository.timecapsule.TimeCapsuleRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TimeCapsuleServiceImpl implements TimeCapsuleService {

    private final TimeCapsuleRepositoryImpl timeCapsuleRepository;
    private final MemberRepositoryImpl memberRepository;

    @Override
    public List<ReviewResponse> getReviewsByPeriod(TimeCapsuleRequest timeCapsuleRequest) {
        return timeCapsuleRepository.findByReviewNoLike(timeCapsuleRequest);
    }

    @Override
    public List<CreatePhotoCardResponse> getPhotoCardsByPeriod(TimeCapsuleRequest timeCapsuleRequest) {
        return timeCapsuleRepository.findByPhotoCardNoLike(timeCapsuleRequest);
    }

    @Override
    @Transactional
    public void saveTimeCapsule(TimeCapsuleRequest timeCapsuleRequest) {
        Optional<Member> findMember = memberRepository.findById(timeCapsuleRequest.getMemberId());
        Member member = findMember.orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));

        TimeCapsule timeCapsule = new TimeCapsule(timeCapsuleRequest.getStartDate(), timeCapsuleRequest.getEndDate(), member);

        List<Review> reviews = timeCapsuleRepository.findByReviewIn(timeCapsuleRequest.getReviewIds());
        List<PhotoCard> photoCards = timeCapsuleRepository.findByPhotoCardIn(timeCapsuleRequest.getPhotoCardIds());

        if(reviews.size() + photoCards.size() == 0) {
            throw new IllegalArgumentException("포토카드와 리뷰를 선택해야 합니다.");
        }

        for (Review review : reviews) {
            new TimeCapsuleItem(ItemType.R, review, timeCapsule);
        }

        for(PhotoCard photoCard : photoCards) {
            new TimeCapsuleItem(ItemType.P, photoCard, timeCapsule);
        }

        timeCapsuleRepository.saveTimeCapsule(timeCapsule);
    }

}
