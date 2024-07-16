package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.Getter;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Table(name="Books")
public class Book {

    @Id
    @GeneratedValue
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private String detail;
    private String purchaseLink;
    private int totalPage;
    @OneToOne(fetch = LAZY)
    private Image image;

}
