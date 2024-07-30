package com.ssafy.readly.controller;

import com.ssafy.readly.dto.review.ReviewRequest;
import com.ssafy.readly.entity.Book;
import com.ssafy.readly.entity.Member;
import com.ssafy.readly.entity.Review;
import com.ssafy.readly.service.book.BookService;
import com.ssafy.readly.service.member.MemberService;
import com.ssafy.readly.service.review.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ReviewController {


    private final ReviewService reviewService;

    private final MemberService memberService;

    private final BookService bookService;

    private ResponseEntity<Map<String, Object>> addReview(ReviewRequest request) throws Exception {
        HttpStatus status = HttpStatus.ACCEPTED;
        Map<String, Object> responseMap = new HashMap<String, Object>();
        Member member = memberService.getMember(request.getMemberId());
        Book book = bookService.getBookByIdForPhoto(request.getBookId());
        Review review = Review.builder()
                .text(request.getText())
                .visibility(request.getVisibility())
                .book(book)
                .member(member)
                .build();
        int reviewId = reviewService.addReview(review);
        String Message = "success";
        responseMap.put("message", Message);
        responseMap.put("reviewId", reviewId);
        return new ResponseEntity<Map<String, Object>>(responseMap, status);

    }

}
