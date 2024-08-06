package com.ssafy.readly.repository.review;

import com.querydsl.core.types.*;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.readly.dto.review.ReviewRequest;
import com.ssafy.readly.dto.review.ReviewResponse;
import com.ssafy.readly.dto.review.ReviewSearchRequest;
import com.ssafy.readly.entity.Review;
import com.ssafy.readly.enums.OrderType;
import com.ssafy.readly.enums.SearchType;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static com.ssafy.readly.entity.QMember.member;
import static com.ssafy.readly.entity.QReview.review;
import static com.ssafy.readly.entity.QTimeCapsuleItem.timeCapsuleItem;
import static com.ssafy.readly.entity.QBook.book;
import static com.ssafy.readly.entity.QLike.like;

@Repository
@RequiredArgsConstructor
@Slf4j
public class ReviewQueryDSLRepositoryImpl implements ReviewQueryDSLRepository {

    private final JPAQueryFactory query;

    /**
     * @param reviewRequest
     * @return
     */
    @Override
    public List<ReviewResponse> getReviews(ReviewSearchRequest reviewRequest) {

        OrderSpecifier[] orderSpecifiers = createOrderSpecifier(reviewRequest);

        List<ReviewResponse> list = query.select(Projections.constructor(ReviewResponse.class,
                        review.id,
                        book.image,
                        book.title,
                        book.author,
                        review.createdDate,
                        review.text,
                        review.visibility,
                        like.count(),
                        ExpressionUtils.as(
                                JPAExpressions.select(like.count())
                                        .from(like)
                                        .join(like.member,member)
                                        .where(member.id.eq(review.member.id)), "check"))
                ).from(like)
                .join(like.timeCapsuleItem, timeCapsuleItem)
                .rightJoin(timeCapsuleItem.review, review)
                .join(review.book, book).groupBy(review.id,review.member.id)
                .orderBy(orderSpecifiers)
                .offset(reviewRequest.getPageNumber())
                .limit(reviewRequest.getPageSize())
                .fetch();
        return list;
    }

    private OrderSpecifier[] createOrderSpecifier(ReviewSearchRequest reviewRequest) {

        List<OrderSpecifier> orderSpecifiers = new ArrayList<>();
        if (reviewRequest.getOrderType()==OrderType.ASC) {
            if (reviewRequest.getSearchType()==SearchType.Like) {
                orderSpecifiers.add(new OrderSpecifier(Order.ASC, like.count()));
            } else {
                orderSpecifiers.add(new OrderSpecifier(Order.ASC, review.createdDate));
            }
        } else{
            if (reviewRequest.getSearchType()==SearchType.Like) {
                orderSpecifiers.add(new OrderSpecifier(Order.DESC, like.count()));
            } else {
                orderSpecifiers.add(new OrderSpecifier(Order.DESC, review.createdDate));
            }
        }
        return orderSpecifiers.toArray(new OrderSpecifier[orderSpecifiers.size()]);
    }
}
