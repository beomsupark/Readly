package com.ssafy.readly.dto.PhotoCard;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePhotoCardResponse {
    private int photoCardId;
    private String photoCardText;
    private String memberId;
    private String bookTitle;
    private String bookAuthor;
    private String photoCardImage;
    private LocalDate photoCardCreatedDate;

    public CreatePhotoCardResponse(int photoCardId, String photoCardText, String bookTitle, String bookAuthor, String photoCardImage, LocalDateTime photoCardCreatedDate) {
        this.photoCardId = photoCardId;
        this.photoCardText = photoCardText;
        this.bookTitle = bookTitle;
        this.bookAuthor = bookAuthor;
        this.photoCardImage = photoCardImage;
        this.photoCardCreatedDate = photoCardCreatedDate.toLocalDate();
    }
}
