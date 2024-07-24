package com.ssafy.readly.entity;

import com.ssafy.readly.dto.BookRequest;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.*;

@Entity
@Getter
@Table(name="Books")
@NoArgsConstructor(access = PROTECTED)
public class Book {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;
    private String title;
    private String author;
    private String isbn;
    private String detail;
    private String purchaseLink;
    private int totalPage;
    private String image;

    @Builder
    public Book(String title, String author, String isbn, String detail, String purchaseLink, int totalPage, String image) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.detail = detail;
        this.purchaseLink = purchaseLink;
        this.totalPage = totalPage;
        this.image = image;
    }

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", isbn='" + isbn + '\'' +
                ", detail='" + detail + '\'' +
                ", purchaseLink='" + purchaseLink + '\'' +
                ", totalPage=" + totalPage +
                ", image='" + image + '\'' +
                '}';
    }
}
