package com.ssafy.readly.dto.Book;

import com.ssafy.readly.entity.Book;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Data
@NoArgsConstructor
public class GetBookByIdResponse {
     private String title;
     private String author;
     private String ISBN;
     private String detail;
     private String purchase_link;
     private int total_page;
     private String image;
     public GetBookByIdResponse(Book book) {
          this.title = book.getTitle();
          this.author = book.getAuthor();
          this.ISBN = book.getIsbn();
          this.detail = book.getDetail();
          this.purchase_link = book.getPurchaseLink();
          this.total_page = book.getTotalPage();
          this.image = book.getImage();
     }
}
