package com.ssafy.readly.service.timecapsule;

import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.review.ReviewResponse;
import com.ssafy.readly.dto.timecapsule.TimeCapsuleAlarmResponse;
import com.ssafy.readly.dto.timecapsule.TimeCapsuleDateResponse;
import com.ssafy.readly.dto.timecapsule.TimeCapsuleRequest;
import com.ssafy.readly.entity.*;
import com.ssafy.readly.enums.ItemType;
import com.ssafy.readly.repository.member.MemberRepositoryImpl;
import com.ssafy.readly.repository.photocard.PhotoCardQueryDSLRepositoryImpl;
import com.ssafy.readly.repository.review.ReviewQueryDSLRepositoryImpl;
import com.ssafy.readly.repository.timecapsule.TimeCapsuleRepositoryImpl;
import com.ssafy.readly.repository.timecapusuleitem.TimeCapsuleItemRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TimeCapsuleServiceImpl implements TimeCapsuleService {

    private final TimeCapsuleRepositoryImpl timeCapsuleRepository;
    private final TimeCapsuleItemRepositoryImpl timeCapsuleItemRepository;
    private final MemberRepositoryImpl memberRepository;
    private final ReviewQueryDSLRepositoryImpl reviewQueryDSLRepository;
    private final PhotoCardQueryDSLRepositoryImpl photoCardQueryDSLRepository;

    @Override
    public List<ReviewResponse> getReviewsByPeriod(TimeCapsuleRequest timeCapsuleRequest) {
        return reviewQueryDSLRepository.findByReviewNoLike(timeCapsuleRequest);
    }

    @Override
    public List<CreatePhotoCardResponse> getPhotoCardsByPeriod(TimeCapsuleRequest timeCapsuleRequest) {
        return photoCardQueryDSLRepository.findByPhotoCardNoLike(timeCapsuleRequest);
    }

    @Override
    @Transactional
    public void saveTimeCapsule(TimeCapsuleRequest timeCapsuleRequest) {
        Optional<Member> findMember = memberRepository.findById(timeCapsuleRequest.getMemberId());
        Member member = findMember.orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));

        TimeCapsule timeCapsule = new TimeCapsule(timeCapsuleRequest.getStartDate(), timeCapsuleRequest.getEndDate(), member);

        if(timeCapsuleRequest.getReviewIds() != null) {
            List<Review> reviews = reviewQueryDSLRepository.findByReviewIn(timeCapsuleRequest.getReviewIds());
            for (Review review : reviews) {
                new TimeCapsuleItem(ItemType.R, review, timeCapsule);
            }
        }

        if(timeCapsuleRequest.getPhotoCardIds() != null) {
            List<PhotoCard> photoCards = photoCardQueryDSLRepository.findByPhotoCardIn(timeCapsuleRequest.getPhotoCardIds());
            for (PhotoCard photoCard : photoCards) {
                new TimeCapsuleItem(ItemType.P, photoCard, timeCapsule);
            }
        }

        if(timeCapsuleRequest.getReviewIds() == null && timeCapsuleRequest.getPhotoCardIds() == null) {
            throw new IllegalArgumentException("포토카드와 리뷰를 선택해야 합니다.");
        }

        timeCapsuleRepository.saveTimeCapsule(timeCapsule);
    }

    @Override
    public Long getTimeCapsuleCount(Integer memberId) {
        return timeCapsuleRepository.countByMemberId(memberId);
    }

    @Override
    public List<TimeCapsuleAlarmResponse> getTimeCapsuleReleaseDate(Integer memberId) {
        return timeCapsuleRepository.findTimeCapsuleByReleaseDate(memberId, LocalDate.now());
    }

    @Override
    public List<ReviewResponse> getTimeCapsuleReviews(int timeCapsuleId) {
        return timeCapsuleItemRepository.findCapsuleReviewsByCapsuleId(timeCapsuleId);
    }

    @Override
    public List<CreatePhotoCardResponse> getTimeCapsulePhotoCards(int timeCapsuleId) {
        return timeCapsuleItemRepository.findCapsulePhotoByCapsuleId(timeCapsuleId);
    }

    @Override
    public TimeCapsuleDateResponse getTimeCapsuleDate(Integer timeCapsuleId) {
        return timeCapsuleRepository.findDateByTimeCapsuleId(timeCapsuleId);
    }

    @Transactional
    @Override
    public void deleteTimeCapsule(Integer timeCapsuleId) {
        TimeCapsule timeCapsule = timeCapsuleRepository.findById(timeCapsuleId).orElseThrow(() ->
                new NoSuchElementException("타임캡슐: " + timeCapsuleId + "이(가) 존재하지 않습니다."));
        timeCapsuleRepository.delete(timeCapsule);
    }
}
