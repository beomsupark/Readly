package com.ssafy.readly.service.mypage;

import com.ssafy.readly.dto.mypage.GetMyFollowerResponse;
import com.ssafy.readly.dto.mypage.GetMyPhotocardResponse;
import com.ssafy.readly.dto.mypage.GetMyReviewResponse;
import com.ssafy.readly.dto.mypage.GetReadBookResponse;
import com.ssafy.readly.entity.Follower;
import com.ssafy.readly.entity.PhotoCard;
import com.ssafy.readly.entity.Review;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MypageService {
    public List<GetReadBookResponse> getReadBook(int userId) throws Exception;
    public List<GetReadBookResponse> getProceedingBooks(int userId) throws Exception;
    public List<GetMyReviewResponse> getReview(int userId) throws Exception;
    public List<GetMyPhotocardResponse> getPhotoCard(int userId) throws Exception;
    public List<GetMyFollowerResponse> getFollower(int userId) throws Exception;

}
