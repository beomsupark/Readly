package com.ssafy.readly.dto.mypage;

import com.ssafy.readly.entity.Book;
import com.ssafy.readly.entity.PhotoCard;
import lombok.Data;

@Data
public class GetMyPhotocardResponse {
    private int photocardId;
    private String bookTitle;
    private String bookAuthor;
    private String photocardImage;
    private String photocardText;

    public GetMyPhotocardResponse(PhotoCard photoCard) {

        this.bookTitle= photoCard.getBook().getTitle();
        this.bookAuthor = photoCard.getBook().getAuthor();
        this.photocardImage= photoCard.getPhotoCardImage();
        this.photocardText = photoCard.getText();
    }

}
