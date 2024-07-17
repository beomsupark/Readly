package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Table(name="timecapsule_photocards")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TimeCapsulePhotoCard {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="id")
    private TimeCapsule timeCapsule;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="id")
    private PhotoCard photoCard;

}
