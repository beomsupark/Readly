package com.ssafy.readly.repository.timecapsule;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.review.ReviewResponse;
import com.ssafy.readly.dto.timecapsule.CardsRequest;
import com.ssafy.readly.entity.QPhotoCard;
import com.ssafy.readly.entity.QReview;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static com.ssafy.readly.entity.QBook.book;
import static com.ssafy.readly.entity.QPhotoCard.photoCard;
import static com.ssafy.readly.entity.QReview.review;

@Repository
public class TimeCapsuleRepositoryImpl implements TimeCapsuleRepository {

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public TimeCapsuleRepositoryImpl(EntityManager em) {
        this.em = em;
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<ReviewResponse> findByReviews(CardsRequest cardsRequest) {
        return queryFactory.select(Projections.constructor(ReviewResponse.class,
                        review.id, book.image, book.title, book.author, review.createdDate, review.text))
                .from(review)
                .join(review.book, book)
                .where(memberIdEq(cardsRequest.getMemberId(), review, null),
                        betweenDate(cardsRequest.getStartDate(), cardsRequest.getEndDate(), review, null))
                .fetch();
    }

    @Override
    public List<CreatePhotoCardResponse> findByPhotoCards(CardsRequest cardsRequest) {
        return queryFactory.select(Projections.constructor(CreatePhotoCardResponse.class,
                        photoCard.id, photoCard.text, book.title, book.author, photoCard.photoCardImage, photoCard.createdDate))
                .from(photoCard)
                .join(photoCard.book, book)
                .where(memberIdEq(cardsRequest.getMemberId(), null, photoCard),
                        betweenDate(cardsRequest.getStartDate(), cardsRequest.getEndDate(), null, photoCard))
                .fetch();
    }

    private BooleanExpression memberIdEq(int memberId, QReview review, QPhotoCard photoCard) {
        if(memberId != 0) {
            if (review != null) {
                return  review.member.id.eq(memberId);
            }

            if (photoCard != null) {
                return photoCard.member.id.eq(memberId);
            }
        }

        return null;
    }

    private BooleanExpression betweenDate(LocalDate startDate, LocalDate endDate, QReview review, QPhotoCard photoCard) {
        if(startDate != null && endDate != null) {
            LocalDateTime startDateTime = startDate.atStartOfDay();
            LocalDateTime endDateTime = endDate.atTime(23, 59, 59);

            if(review != null) {
                return review.createdDate.between(startDateTime, endDateTime);
            }

            if(photoCard != null) {
                return photoCard.createdDate.between(startDateTime, endDateTime);
            }
        }

        return null;
    }
}
