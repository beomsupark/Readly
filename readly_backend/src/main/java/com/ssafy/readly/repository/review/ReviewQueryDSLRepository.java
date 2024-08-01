package com.ssafy.readly.repository.review;

import com.ssafy.readly.dto.review.ReviewRequest;
import com.ssafy.readly.dto.review.ReviewResponse;
import com.ssafy.readly.dto.review.ReviewSearchRequest;

import java.util.List;

public interface ReviewQueryDSLRepository
{
    List<ReviewResponse> getReviews(ReviewSearchRequest reviewRequest);
}
