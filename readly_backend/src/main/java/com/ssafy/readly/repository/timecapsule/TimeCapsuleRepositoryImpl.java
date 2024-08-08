package com.ssafy.readly.repository.timecapsule;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.review.ReviewResponse;
import com.ssafy.readly.dto.timecapsule.TimeCapsuleAlarmResponse;
import com.ssafy.readly.entity.*;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

import static com.ssafy.readly.entity.QBook.book;
import static com.ssafy.readly.entity.QPhotoCard.photoCard;
import static com.ssafy.readly.entity.QReview.review;
import static com.ssafy.readly.entity.QTimeCapsule.timeCapsule;
import static com.ssafy.readly.entity.QTimeCapsuleItem.timeCapsuleItem;

@Repository
public class TimeCapsuleRepositoryImpl implements TimeCapsuleRepository {

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public TimeCapsuleRepositoryImpl(EntityManager em) {
        this.em = em;
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public void saveTimeCapsule(TimeCapsule timeCapsule) {
        em.persist(timeCapsule);
    }

    @Override
    public Long countByMemberId(Integer memberId) {
        return queryFactory
                .select(timeCapsule.id.count())
                .from(timeCapsule)
                .where(timeCapsule.member.id.eq(memberId), timeCapsule.isRead.isFalse())
                .fetchOne();
    }

    @Override
    public List<TimeCapsuleAlarmResponse> findTimeCapsuleByReleaseDate(Integer memberId, LocalDate date) {
        return queryFactory
                .select(Projections.constructor(TimeCapsuleAlarmResponse.class,
                        timeCapsule.id, timeCapsule.createdDate, timeCapsule.isRead))
                .from(timeCapsule)
                .where(timeCapsule.releaseDate.goe(date), timeCapsule.member.id.eq(memberId))
                .orderBy(timeCapsule.isRead.asc(), timeCapsule.releaseDate.desc())
                .fetch();
    }

    @Override
    public List<ReviewResponse> findByTimeCapsuleReviews(int timeCapsuleId) {
        return queryFactory
                .select(Projections.constructor(ReviewResponse.class,
                        review.id, book.image, book.title, book.author, review.createdDate, review.text))
                .from(timeCapsuleItem)
                .join(timeCapsuleItem.review, review)
                .join(review.book, book)
                .where(timeCapsuleItem.timeCapsule.id.eq(timeCapsuleId))
                .fetch();
    }

    @Override
    public List<CreatePhotoCardResponse> findByTimeCapsulePhotoCards(int timeCapsuleId) {
        return queryFactory
                .select(Projections.constructor(CreatePhotoCardResponse.class,
                        photoCard.id, photoCard.text, book.title, book.author, photoCard.photoCardImage, photoCard.createdDate))
                .from(timeCapsuleItem)
                .join(timeCapsuleItem.photoCard, photoCard)
                .join(photoCard.book, book)
                .where(timeCapsuleItem.timeCapsule.id.eq(timeCapsuleId))
                .fetch();
    }
}
