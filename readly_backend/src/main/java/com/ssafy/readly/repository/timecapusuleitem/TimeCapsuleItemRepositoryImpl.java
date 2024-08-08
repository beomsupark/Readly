package com.ssafy.readly.repository.timecapusuleitem;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.readly.entity.TimeCapsuleItem;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import static com.ssafy.readly.entity.QTimeCapsuleItem.timeCapsuleItem;

@Repository
public class TimeCapsuleItemRepositoryImpl implements TimeCapsuleItemRepository {
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public TimeCapsuleItemRepositoryImpl(EntityManager em) {
        this.em = em;
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public void save(final TimeCapsuleItem item) {em.persist(item);}

    @Override
    public void delete(final TimeCapsuleItem item) {em.remove(item);}

    @Override
    public Optional<TimeCapsuleItem> findTimeCapsuleItemByReviewId(Integer reviewId) {
        return Optional.ofNullable(queryFactory
                .selectFrom(timeCapsuleItem)
                .where(timeCapsuleItem.review.id.eq(reviewId))
                .fetchOne());
    }

    @Override
    public Optional<TimeCapsuleItem> findTimeCapsuleItemByPhotoCardId(Integer photoCardId) {
        return Optional.ofNullable(queryFactory
                .selectFrom(timeCapsuleItem)
                .where(timeCapsuleItem.photoCard.id.eq(photoCardId))
                .fetchOne());
    }
}
