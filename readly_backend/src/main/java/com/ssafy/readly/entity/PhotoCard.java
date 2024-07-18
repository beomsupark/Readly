package com.ssafy.readly.entity;

import com.ssafy.readly.enums.Visibility;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.*;
import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.*;

@Entity
@Table(name = "photocards")
@Getter
@NoArgsConstructor(access = PROTECTED)
public class PhotoCard {

    @Id
    @GeneratedValue
    private int id;
    private String text;
    private String photoCardImage;
    @Enumerated(value = STRING)
    private Visibility visibility;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}
