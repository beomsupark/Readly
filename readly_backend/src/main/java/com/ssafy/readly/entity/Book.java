package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.*;

@Entity
@Getter
@Table(name="Books")
@NoArgsConstructor(access = PROTECTED)
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
