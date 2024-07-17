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
    private Long id;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id")
    private TimeCapsule timeCapsule;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id")
    private Review review;
}
