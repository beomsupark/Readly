package com.ssafy.readly.entity;

import com.ssafy.readly.dto.Visibility;
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
    private int id;
    private String text;
    private int like;
    @Enumerated(value = EnumType.STRING)
    private Visibility visibility; // ALONE, GROUP, EVERY

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "book_id")
    private Book book;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "image_id")
    private Image image;
}
