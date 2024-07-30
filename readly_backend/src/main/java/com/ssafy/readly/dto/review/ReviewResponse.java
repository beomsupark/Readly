package com.ssafy.readly.dto.review;

import com.ssafy.readly.entity.Review;
import com.ssafy.readly.enums.Visibility;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class ReviewResponse {
    private int reviewId;
    private String bookImage;
    private String bookTitle;
    private String bookAuthor;
    private LocalDateTime createdDate;
    private String reviewText;
    private Visibility visibility;


    public ReviewResponse(Review review) {
        this.reviewId = review.getId();
        this.bookImage = review.getBook().getImage();
        this.bookTitle = review.getBook().getTitle();
        this.bookAuthor = review.getBook().getAuthor();
        this.createdDate = review.getCreatedDate();
        this.reviewText = review.getText();
        this.visibility = review.getVisibility();
    }
}
