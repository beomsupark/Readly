package com.ssafy.readly.repository.photocard;

import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardRequest;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.entity.PhotoCard;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PhotoCardRepositoryImpl implements PhotoCardRepository{

    private final EntityManager em;

    @Override
    public void addPhotoCard(PhotoCard photoCard) throws Exception {
        em.persist(photoCard);
    }

    @Override
    public CreatePhotoCardResponse createPhotoCard(CreatePhotoCardRequest request) {
        // 쿼리 dsl
        return null;
    }
}
