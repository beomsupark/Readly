package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.Getter;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Table(name = "followers")
public class Follower {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id")
    private Member following;
    @OneToOne(fetch = LAZY)
    private Member followed;
}
