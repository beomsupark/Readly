package com.ssafy.readly.repository.like;

import com.ssafy.readly.entity.Like;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class LikeRepositoryImpl implements LikeRepository{
    private final EntityManager em;

    @Override
    public void save(Like like) {em.persist(like);}

    @Override
    public void delete(Like like) {em.remove(like);}
}
