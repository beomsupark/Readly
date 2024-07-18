package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Table(name="timecapsule_reviews")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TimeCapsuleReviews {

    @Id
    @GeneratedValue
    private int id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "timeCapsule_id")
    private TimeCapsule timeCapsule;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "review_id")
    private Review review;
}
