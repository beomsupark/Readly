package com.ssafy.readly.service.review;

import com.ssafy.readly.dto.review.ReviewRequest;
import com.ssafy.readly.dto.review.ReviewResponse;

import java.util.List;

public class ReviewServiceImpl implements ReviewService {

    /**
     * @param review
     * @return
     */
    @Override
    public int addReview(ReviewRequest review) {
        return 0;
    }

    /**
     * @param id
     * @return
     */
    @Override
    public ReviewResponse findReviewById(int id) {
        return null;
    }

    /**
     * @param id
     * @return
     */
    @Override
    public ReviewResponse findReviewByMemberId(int id) {
        return null;
    }

    /**
     * @return
     */
    @Override
    public List<ReviewResponse> findReviewsSortedByLike() {
        return List.of();
    }

    /**
     * @return
     */
    @Override
    public List<ReviewResponse> findAllReviews() {
        return List.of();
    }
}
