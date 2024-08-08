package com.ssafy.readly.repository.photocard;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardRequest;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.PhotoCard.PhotoCardSearchRequest;
import com.ssafy.readly.dto.review.ReviewResponse;
import com.ssafy.readly.dto.review.ReviewSearchRequest;
import com.ssafy.readly.entity.PhotoCard;
import com.ssafy.readly.enums.OrderType;
import com.ssafy.readly.enums.SearchType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import static com.ssafy.readly.entity.QBook.book;
import static com.ssafy.readly.entity.QLike.like;
import static com.ssafy.readly.entity.QMember.member;
import static com.ssafy.readly.entity.QPhotoCard.photoCard;
import static com.ssafy.readly.entity.QReview.review;
import static com.ssafy.readly.entity.QTimeCapsuleItem.timeCapsuleItem;

@Repository
@RequiredArgsConstructor
@Slf4j
public class PhotoCardQueryDSLRepositoryImpl implements PhotoCardQueryDSLRepository{

    private final EntityManager em;
    private final JPAQueryFactory query;

    @Override
    public int addPhotoCard(PhotoCard photoCard) throws Exception {
        em.persist(photoCard);
        return photoCard.getId();
    }

    @Override
    public CreatePhotoCardResponse getPhotoCard(int id) {
        // 쿼리 dsl
        List<CreatePhotoCardResponse> result = query.select(Projections.constructor(CreatePhotoCardResponse.class
                        ,photoCard.id
                        ,photoCard.text
                        ,photoCard.member.loginId
                        ,photoCard.book.title
                        ,photoCard.book.author
                        ,photoCard.photoCardImage
                        ,photoCard.createdDate))
                .from(photoCard)
                .join(photoCard.member)
                .join(photoCard.book)
                .where(photoCard.id.eq(id))
                .fetch();
        CreatePhotoCardResponse response = Optional.of(result.get(0)).orElseThrow(NoResultException::new);
        return response;
    }


    @Override
    public long updatePhotoCard(CreatePhotoCardRequest request) {
        return query
                .update(photoCard)
                .set(photoCard.photoCardImage, request.getImageLink())
                .where(photoCard.id.eq(request.getPhotoCardId()))
                .execute();
    }

    /**
     * @param request
     * @return
     * @throws Exception
     */
    @Override
    public List<CreatePhotoCardResponse> findPhotoCardsSorted(PhotoCardSearchRequest request) throws Exception {
        OrderSpecifier[] orderSpecifiers = createOrderSpecifier(request);

        List<CreatePhotoCardResponse> list = query.select(Projections.constructor(CreatePhotoCardResponse.class,
                        photoCard.id,
                        photoCard.text,
                        member.loginId,
                        book.title,
                        book.author,
                        photoCard.photoCardImage,
                        photoCard.createdDate,
                        like.count(),
                        ExpressionUtils.as(
                                JPAExpressions.select(like.count())
                                        .from(like)
                                        .join(like.member,member)
                                        .where(member.id.eq(photoCard.member.id)), "check")
                        )
                ).from(like)
                .join(like.timeCapsuleItem, timeCapsuleItem)
                .rightJoin(timeCapsuleItem.photoCard, photoCard)
                .join(photoCard.member,member)
                .join(photoCard.book, book)
                .groupBy(photoCard.id,photoCard.member.id)
                .orderBy(orderSpecifiers)
                .offset(request.getPageNumber())
                .limit(request.getPageSize())
                .fetch();
        return list;
    }


    private OrderSpecifier[] createOrderSpecifier(PhotoCardSearchRequest reviewRequest) {

        List<OrderSpecifier> orderSpecifiers = new ArrayList<>();
        if (reviewRequest.getOrderType()== OrderType.ASC) {
            if (reviewRequest.getSearchType()== SearchType.Like) {
                orderSpecifiers.add(new OrderSpecifier(Order.ASC, like.count()));
            } else {
                orderSpecifiers.add(new OrderSpecifier(Order.ASC, photoCard.createdDate));
            }
        } else{
            if (reviewRequest.getSearchType()==SearchType.Like) {
                orderSpecifiers.add(new OrderSpecifier(Order.DESC, like.count()));
            } else {
                orderSpecifiers.add(new OrderSpecifier(Order.DESC, photoCard.createdDate));
            }
        }
        return orderSpecifiers.toArray(new OrderSpecifier[orderSpecifiers.size()]);
    }
}
