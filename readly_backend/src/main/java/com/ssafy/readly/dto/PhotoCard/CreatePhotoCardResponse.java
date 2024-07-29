package com.ssafy.readly.dto.PhotoCard;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreatePhotoCardResponse {
    int photoCardId;
    String photoCardText;
    String memberId;
    String bookTitle;
    String bookAuthor;
    String photoCardImage;
    LocalDate photoCardCreatedDate;

    @Builder
    public CreatePhotoCardResponse(int photoCardId, String photoCardText, String memberId, String bookTitle, String bookAuthor, String photoCardImage,LocalDate photoCardCreatedDate) {
        this.photoCardId = photoCardId;
        this.photoCardText = photoCardText;
        this.memberId = memberId;
        this.bookTitle = bookTitle;
        this.bookAuthor = bookAuthor;
        this.photoCardImage = photoCardImage;
        this.photoCardCreatedDate = photoCardCreatedDate;

    }
}
