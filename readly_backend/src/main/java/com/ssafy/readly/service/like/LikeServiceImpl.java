package com.ssafy.readly.service.like;

import com.ssafy.readly.dto.like.LikeRequest;
import com.ssafy.readly.entity.*;
import com.ssafy.readly.enums.ItemType;
import com.ssafy.readly.repository.like.LikeRepositoryImpl;
import com.ssafy.readly.repository.member.MemberRepositoryImpl;
import com.ssafy.readly.repository.photocard.PhotoCardRepository;
import com.ssafy.readly.repository.review.ReviewRepositry;
import com.ssafy.readly.repository.timecapusuleitem.TimeCapsuleItemRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class LikeServiceImpl implements LikeService {
    private final LikeRepositoryImpl likeRepository;
    private final MemberRepositoryImpl memberRepository;
    private final ReviewRepositry reviewRepository;
    private final PhotoCardRepository photoCardRepository;
    private final TimeCapsuleItemRepositoryImpl timeCapsuleItemRepository;

    public void like(LikeRequest likeRequest) {
        Member member = memberRepository.findById(likeRequest.getMemberId()).orElseThrow(
                () -> new NoSuchElementException("멤버: " + likeRequest.getMemberId() + "이(가) 존재하지 않습니다."));
        Integer reviewId = likeRequest.getReviewId();
        Integer photoCardId = likeRequest.getPhotoCardId();

        if(reviewId != null) {
            Review review = reviewRepository.findById(reviewId).orElseThrow(
                    () -> new NoSuchElementException("리뷰: " + reviewId + "이(가) 존재하지 않습니다."));
            TimeCapsuleItem timeCapsuleItem = new TimeCapsuleItem(ItemType.R, review);
            createLike(member, timeCapsuleItem);
        }

        if(photoCardId != null) {
            PhotoCard photoCard = photoCardRepository.findById(photoCardId).orElseThrow(
                    () -> new NoSuchElementException("포토카드: " + photoCardId + "이(가) 존재하지 않습니다."));
            TimeCapsuleItem timeCapsuleItem = new TimeCapsuleItem(ItemType.P, photoCard);
            createLike(member, timeCapsuleItem);
        }
    }

    public void cancelLike(LikeRequest likeRequest) {
        Integer reviewId = likeRequest.getReviewId();
        Integer photoCardId = likeRequest.getPhotoCardId();

        if(reviewId != null) {
            TimeCapsuleItem timeCapsuleItem = timeCapsuleItemRepository.findTimeCapsuleItemByReviewId(reviewId).orElseThrow(
                    () -> new NoSuchElementException(reviewId + "에 해당하는 타임캡슐 아이템이 존재하지 않습니다."));
            deleteLike(likeRequest.getMemberId(), timeCapsuleItem);
        }

        if(photoCardId != null) {
            TimeCapsuleItem timeCapsuleItem = timeCapsuleItemRepository.findTimeCapsuleItemByPhotoCardId(photoCardId).orElseThrow(
                    () -> new NoSuchElementException(photoCardId + "에 해당하는 타임캡슐 아이템이 존재하지 않습니다."));
            deleteLike(likeRequest.getMemberId(), timeCapsuleItem);
        }
    }

    private void createLike(Member member, TimeCapsuleItem timeCapsuleItem) {
        timeCapsuleItemRepository.save(timeCapsuleItem);
        Like like = new Like(member, timeCapsuleItem);
        likeRepository.save(like);
    }

    private void deleteLike(Integer memberId, TimeCapsuleItem timeCapsuleItem) {
        likeRepository.delete(memberId, timeCapsuleItem.getId());
        timeCapsuleItemRepository.delete(timeCapsuleItem);
    }
}
