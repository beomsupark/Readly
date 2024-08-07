package com.ssafy.readly.service.like;

import com.ssafy.readly.dto.like.LikeRequest;
import com.ssafy.readly.entity.Like;
import com.ssafy.readly.repository.like.LikeRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class LikeServiceImpl implements LikeService {

    private final LikeRepositoryImpl likeRepository;

    public void like(LikeRequest likeRequest) {
//        new Like();
    }
}
