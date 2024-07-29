package com.ssafy.readly.dto.PhotoCard;

import lombok.Data;

@Data
public class CreatePhotoCardRequest {
    private String imageLink;
    private int photoCardId;
}
