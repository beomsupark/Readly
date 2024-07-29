package com.ssafy.readly.dto.mypage;

import com.ssafy.readly.entity.Book;
import lombok.Data;

@Data
public class GetReadBookResponse {
    private String title;
    private String image;
    private String author;
    private String detail;

    public GetReadBookResponse(String title, String image, String author, String detail) {
        this.title = title;
        this.image = image;
        this.author = author;
        this.detail = detail;
    }

    public GetReadBookResponse(Book book) {
        this.title = book.getTitle();
        this.image = book.getImage();
        this.author = book.getAuthor();
        this.detail = book.getDetail();
    }
}
