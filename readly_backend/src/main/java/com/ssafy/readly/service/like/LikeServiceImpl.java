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

        if(likeRequest.getReviewId() != 0) {
            Review review = reviewRepository.findById(likeRequest.getReviewId()).orElseThrow(
                    () -> new NoSuchElementException("리뷰: " + likeRequest.getReviewId() + "이(가) 존재하지 않습니다."));
            TimeCapsuleItem timeCapsuleItem = new TimeCapsuleItem(ItemType.R, review);
            createLike(member, timeCapsuleItem);
        }

        if(likeRequest.getPhotoCardId() != 0) {
            PhotoCard photoCard = photoCardRepository.findById(likeRequest.getPhotoCardId()).orElseThrow(
                    () -> new NoSuchElementException("포토카드: " + likeRequest.getPhotoCardId() + "이(가) 존재하지 않습니다."));
            TimeCapsuleItem timeCapsuleItem = new TimeCapsuleItem(ItemType.P, photoCard);
            createLike(member, timeCapsuleItem);
        }
    }

    private void createLike(Member member, TimeCapsuleItem timeCapsuleItem) {
        timeCapsuleItemRepository.save(timeCapsuleItem);
        Like like = new Like(member, timeCapsuleItem);
        likeRepository.save(like);
    }
}
