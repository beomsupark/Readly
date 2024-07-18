package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Table(name="Books")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Book {

    @Id
    @GeneratedValue
    private int id;

    private String title;
    private String author;
    private String isbn;
    private String detail;
    private String purchaseLink;
    private int totalPage;
    private String image;
}
