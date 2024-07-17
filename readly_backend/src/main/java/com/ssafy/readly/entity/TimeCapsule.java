package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Table(name="timecapsules")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TimeCapsule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "id")
    private Member member;
    private LocalDate releaseDate;
    private LocalDate startDate;
    private LocalDate endDate;
    @OneToMany(mappedBy = "timeCapsule", cascade = CascadeType.ALL)
    private List<TimeCapsulePhotoCard> timeCapsulePhotoCards;
}
