package com.ssafy.readly.service.photocard;

import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardRequest;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.entity.PhotoCard;
import com.ssafy.readly.repository.photocard.PhotoCardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class PhotoCardServiceImpl implements PhotoCardService{

    private final PhotoCardRepository photoCardRepositoryImpl;

    @Override
    public void addPhotoCard(PhotoCard photoCard) throws Exception {
        photoCardRepositoryImpl.addPhotoCard(photoCard);
    }

    @Override
    public CreatePhotoCardResponse createPhotoCard(CreatePhotoCardRequest request) throws Exception {
        // 포토카드 생성 후 유저정보,포토카드 정보, 책 정보중 원하는 데이터만 추출해 반환
        return photoCardRepositoryImpl.createPhotoCard(request);
    }

}
