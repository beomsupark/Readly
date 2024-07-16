package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Table(name = "photocards")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PhotoCard {

    @Id
    @GeneratedValue
    private Long id;
    @OneToOne(fetch = LAZY)
    private Image image;
    private String text;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id")
    private Book book;
    private int like;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id")
    private Member member;
    private
}
