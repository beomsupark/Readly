package com.ssafy.readly.dto.PhotoCard;

import lombok.*;

import java.time.LocalDate;

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

}
