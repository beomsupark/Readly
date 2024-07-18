package com.ssafy.readly.entity;

import com.ssafy.readly.enums.ItemType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.EnumType.*;
import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.*;

@Entity
@Getter
@Table(name="timecapsule_items")
@NoArgsConstructor(access = PROTECTED)
public class TimeCapsuleItem {

    @Id
    @GeneratedValue
    private int id;
    @Enumerated(value = STRING)
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
