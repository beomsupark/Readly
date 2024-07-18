package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Table(name = "likes")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Like {

    @Id
    @GeneratedValue
    private int id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "timeCapsuleItem_id")
    private TimeCapsuleItem timeCapsuleItem;
}
