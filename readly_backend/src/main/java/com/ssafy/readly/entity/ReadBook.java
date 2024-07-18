package com.ssafy.readly.entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Table(name="read_books")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReadBook {

    @Id
    @GeneratedValue
    private int id;

    private int currentPage;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Group group;
}
