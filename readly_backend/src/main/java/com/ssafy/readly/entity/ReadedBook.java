package com.ssafy.readly.entity;


import jakarta.persistence.*;

import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Table(name="readed_books")
public class ReadedBook {

    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id")
    private Book book;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id")
    private Member member;


}
