package com.ssafy.readly.dto.PhotoCard;

import lombok.Data;

@Data
public class CreatePhotoCardResponse {
    int photoCardId;
    String photoCardText;
    String memberId;
    String bookTitle;
    String bookAuthor;
    String photoCardImage;
    String photoCardCreatedDate;
}
