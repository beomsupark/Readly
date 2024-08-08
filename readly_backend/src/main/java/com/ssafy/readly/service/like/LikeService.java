package com.ssafy.readly.service.like;

import com.ssafy.readly.dto.like.LikeRequest;

public interface LikeService {
    void like(LikeRequest likeRequest);
    void cancelLike(LikeRequest likeRequest);
}
