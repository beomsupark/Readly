package com.ssafy.readly.entity;

import com.ssafy.readly.entity.common.ItemType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Table(name="timecapsule_items")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TimeCapsuleItem {
    @Id
    @GeneratedValue
    private int id;

    @Enumerated(EnumType.STRING)
    private ItemType itemType;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="timeCapsule_id")
    private TimeCapsule timeCapsule;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="photoCard_id")
    private PhotoCard photoCard;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="review_id")
    private Review review;
}
