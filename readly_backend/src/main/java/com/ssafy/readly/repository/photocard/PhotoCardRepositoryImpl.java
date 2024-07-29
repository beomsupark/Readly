package com.ssafy.readly.repository.photocard;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardRequest;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.entity.Member;
import com.ssafy.readly.entity.PhotoCard;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import lombok.RequiredArgsConstructor;
import org.springframework.expression.spel.ast.Projection;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


import static com.ssafy.readly.entity.QMember.member;
import static com.ssafy.readly.entity.QBook.book;
import static com.ssafy.readly.entity.QPhotoCard.photoCard;

@Repository
@RequiredArgsConstructor
public class PhotoCardRepositoryImpl implements PhotoCardRepository{

    private final EntityManager em;
    private final JPAQueryFactory query;

    @Override
    public void addPhotoCard(PhotoCard photoCard) throws Exception {
        em.persist(photoCard);
    }

    @Override
    public CreatePhotoCardResponse getPhotoCard(int id) {
        // 쿼리 dsl
        List<CreatePhotoCardResponse> result = query.select(Projections.bean(CreatePhotoCardResponse.class
                        ,photoCard.id
                        ,photoCard.text
                        ,member.id
                        ,book.title
                        ,book.author
                        ,photoCard.photoCardImage
                        ,photoCard.createdDate))
                .from(photoCard)
                .join(photoCard.member, member)
                .join(photoCard.book, book)
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
                .where(photoCard.id.eq(request.getPhotoCard_id()))
                .execute();
    }
}
