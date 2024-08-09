package com.ssafy.readly.repository.photocard;

import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardRequest;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.PhotoCard.PhotoCardSearchRequest;
import com.ssafy.readly.dto.timecapsule.TimeCapsuleRequest;
import com.ssafy.readly.entity.PhotoCard;

import java.util.List;

public interface PhotoCardQueryDSLRepository {

    public int addPhotoCard(PhotoCard photoCard) throws Exception;

    CreatePhotoCardResponse getPhotoCard(int id);

    public long updatePhotoCard(CreatePhotoCardRequest request) throws Exception;

    List<CreatePhotoCardResponse> findPhotoCardsSorted(PhotoCardSearchRequest request) throws Exception;

    List<CreatePhotoCardResponse> findByPhotoCardNoLike(TimeCapsuleRequest timeCapsuleRequest);

    List<PhotoCard> findByPhotoCardIn(Integer[] photoCards);
}
