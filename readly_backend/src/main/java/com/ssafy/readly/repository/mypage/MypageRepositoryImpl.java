package com.ssafy.readly.repository.mypage;

import com.ssafy.readly.dto.mypage.GetReadBookResponse;
import com.ssafy.readly.entity.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MypageRepositoryImpl implements MypageRepository {

    private final EntityManager entityManager;

    @Override
    public List<ReadBook> getReadBook(int userId) throws Exception {
        String jpql = "SELECT r " +
                "FROM ReadBook r JOIN FETCH r.book b " +
                "WHERE r.member.id = :userId and b.totalPage = r.currentPage";
        Query query = entityManager.createQuery(jpql, ReadBook.class);
        query.setParameter("userId", userId);

        return query.getResultList();
    }

    @Override
    public List<ReadBook> getProceedingBooks(int userId) throws Exception {
        String jpql = "SELECT r " +
                "FROM ReadBook r JOIN FETCH r.book b " +
                "WHERE r.member.id = :userId and b.totalPage > r.currentPage";
        Query query = entityManager.createQuery(jpql, ReadBook.class);
        query.setParameter("userId", userId);

        return query.getResultList();
    }

    @Override
    public List<Review> getReview(int userId) throws Exception {
        String jpql = "SELECT r " +
                "FROM Review r " +
                "WHERE r.member.id = :userId";
        Query query = entityManager.createQuery(jpql, Review.class);
        query.setParameter("userId", userId);

        return query.getResultList();
    }

    @Override
    public List<PhotoCard> getPhotoCard(int userId) throws Exception {
        String jpql = "SELECT p " +
                "FROM PhotoCard p " +
                "WHERE p.member.id = :userId";
        Query query = entityManager.createQuery(jpql, PhotoCard.class);
        query.setParameter("userId", userId);

        return query.getResultList();
    }

    @Override
    public List<Follower> getFollower(int userId) throws Exception {
        String jpql = "SELECT f " +
                "FROM Follower f " +
                "WHERE f.following = :userId";
        Query query = entityManager.createQuery(jpql, Follower.class);
        query.setParameter("userId", userId);

        return query.getResultList();
    }
}
