package com.ssafy.readly.repository.mypage;

import com.ssafy.readly.dto.mypage.CompleteBookRequest;
import com.ssafy.readly.dto.mypage.GetReadBookResponse;
import com.ssafy.readly.dto.mypage.UpdateCurrentPageRequest;
import com.ssafy.readly.entity.*;
import com.ssafy.readly.enums.ReadType;
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
                "WHERE r.member.id = :userId AND b.totalPage > r.currentPage AND r.readType = :readType AND r.group IS NULL";
        Query query = entityManager.createQuery(jpql, ReadBook.class);
        query.setParameter("userId", userId);
        query.setParameter("readType", ReadType.R);  // Assuming ReadType is an enum

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
                "WHERE f.following.id = :userId";
        Query query = entityManager.createQuery(jpql, Follower.class);
        query.setParameter("userId", userId);

        return query.getResultList();
    }

    @Override
    public int updateCurrentPage(UpdateCurrentPageRequest request) throws Exception {
        int currentPage = request.getCurrentPage();
        int readBookId = request.getReadBookId();
        String jpql = "UPDATE ReadBook r " +
                "SET r.currentPage = :currentPage " +
                "WHERE r.id = :readBookId";
        Query query = entityManager.createQuery(jpql);
        query.setParameter("currentPage", currentPage).setParameter("readBookId", readBookId);

        return query.executeUpdate();
    }

    @Override
    public void completeBook(CompleteBookRequest request) throws Exception {
        String jpql = "UPDATE ReadBook r " +
                "SET r.readType = 'D' " +
                "WHERE r.book.id = :bookId AND r.member.id = :memberId AND r.group IS NULL";
        Query query = entityManager.createQuery(jpql);
        query.setParameter("bookId", request.getBookId());
        query.setParameter("memberId", request.getMemberId());

        // 실제 업데이트 쿼리 실행
        int updatedCount = query.executeUpdate();

        if (updatedCount == 0) {
            throw new Exception("Update failed: No matching record found.");
        }
    }
}
