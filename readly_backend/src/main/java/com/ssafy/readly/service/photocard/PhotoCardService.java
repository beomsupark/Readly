package com.ssafy.readly.service.photocard;


import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardRequest;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.PhotoCard.PhotoCardSearchRequest;
import com.ssafy.readly.entity.PhotoCard;

import java.util.List;

public interface PhotoCardService {

    int addPhotoCard(PhotoCard photoCard) throws Exception;

    CreatePhotoCardResponse createPhotoCard(CreatePhotoCardRequest request) throws Exception;

    public CreatePhotoCardResponse findPhotoCardById(int id) throws Exception;

    List<CreatePhotoCardResponse> findPhotoCardsSorted(PhotoCardSearchRequest request) throws Exception;
}
