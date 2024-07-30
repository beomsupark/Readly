package com.ssafy.readly.service.review;

import com.ssafy.readly.dto.review.ReviewRequest;
import com.ssafy.readly.dto.review.ReviewResponse;
import com.ssafy.readly.entity.Review;
import com.ssafy.readly.repository.review.ReviewRepositry;
import jakarta.persistence.NoResultException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepositry reviewRepository;

    /**
     * @param review
     * @return
     */
    @Override
    public int addReview(Review review) {
        reviewRepository.save(review);
        return review.getId();
    }

    /**
     * @param id
     * @return
     */
    @Override
    public ReviewResponse findReviewById(int id) {
        return new ReviewResponse(reviewRepository.findById(id).orElseThrow(NoResultException::new));
    }

    /**
     * @param id
     * @return
     */
    @Override
    public ReviewResponse findReviewByMemberId(int id) {

        return new ReviewResponse(Optional.of(reviewRepository.findByMemberId(id)).orElseThrow(NoResultException::new));

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
