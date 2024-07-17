package com.ssafy.readly.entity;

import com.ssafy.readly.dto.Visibility;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Table(name="reviews")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Review {

    @Id
    @GeneratedValue
    private Long id;

    private String text;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id")
    private Book book;

    private int like;

    private LocalDate createdDate;

    private Visibility visibility;
}
