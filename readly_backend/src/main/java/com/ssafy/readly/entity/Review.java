package com.ssafy.readly.entity;

import com.ssafy.readly.enums.Visibility;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static jakarta.persistence.EnumType.*;
import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.*;

@Entity
@Getter
@Table(name="reviews")
@NoArgsConstructor(access = PROTECTED)
public class Review {

    @Id
    @GeneratedValue
    private int id;
    private String text;
    private LocalDateTime createdDate;
    @Enumerated(value = STRING)
    private Visibility visibility;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "book_id")
    private Book book;
}
