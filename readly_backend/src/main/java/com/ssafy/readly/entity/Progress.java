package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Table(name="progresses")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Progress {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id")
    private Member member;
    private int currentPage;
    private int totalPage;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id")
    private Book book;

}
