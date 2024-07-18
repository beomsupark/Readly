package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.*;

@Entity
@Getter
@Table(name = "followers")
@NoArgsConstructor(access = PROTECTED)
public class Follower {

    @Id
    @GeneratedValue
    private int id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "following_id")
    private Member following;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "followed_id")
    private Member followed;
}
