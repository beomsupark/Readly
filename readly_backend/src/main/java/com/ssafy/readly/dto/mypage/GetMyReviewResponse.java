package com.ssafy.readly.dto.mypage;

import com.ssafy.readly.entity.Book;
import com.ssafy.readly.entity.Review;
import lombok.Data;

@Data
public class GetMyReviewResponse {
    private int reviewId;
    private String reviewText;
    private String bookTitle;
    private String bookAuthor;
    private String bookDescription;
    private String bookImage;

    public GetMyReviewResponse(Review review) {
        this.reviewId = review.getId();
        this.reviewText = review.getText();
        this.bookTitle = review.getBook().getTitle();
        this.bookAuthor = review.getBook().getAuthor();
        this.bookDescription = review.getBook().getDetail();
        this.bookImage = review.getBook().getImage();

    }

}
