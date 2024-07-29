package com.ssafy.readly.repository.photocard;

import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardRequest;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoResponse;
import com.ssafy.readly.entity.PhotoCard;

public interface PhotoCardRepository {

    public void addPhotoCard(PhotoCard photoCard) throws Exception;

    CreatePhotoCardResponse getPhotoCard(int id);

    public long updatePhotoCard(CreatePhotoCardRequest request) throws Exception;
}
