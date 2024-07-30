package com.ssafy.readly.service.review;

import com.ssafy.readly.dto.review.ReviewRequest;
import com.ssafy.readly.dto.review.ReviewResponse;

import java.util.List;

public interface ReviewService {

    // Create
    int addReview(ReviewRequest review);

    // Read
    ReviewResponse findReviewById(int id);

    ReviewResponse findReviewByMemberId(int id);

    // 리뷰 좋아요 순 10개
    List<ReviewResponse> findReviewsSortedByLike();

    // 전체 리뷰
    List<ReviewResponse> findAllReviews();
}
