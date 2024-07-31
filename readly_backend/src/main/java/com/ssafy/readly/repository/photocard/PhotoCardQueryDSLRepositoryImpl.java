package com.ssafy.readly.repository.photocard;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardRequest;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.entity.PhotoCard;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


import static com.ssafy.readly.entity.QPhotoCard.photoCard;

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

}
