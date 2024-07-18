package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.*;

@Entity
@Getter
@Table(name="timecapsules")
@NoArgsConstructor(access = PROTECTED)
public class TimeCapsule {

    @Id
    @GeneratedValue
    private int id;
    private LocalDate releaseDate;
    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "timeCapsule", cascade = CascadeType.ALL)
    private List<TimeCapsuleItem> timeCapsuleItems = new ArrayList<>();

    /* 연관 관계 편의 메소드 */
    public void setMember(Member member){
        if (this.member != null) {
            this.member.getTimeCapsules().remove(this);
        }

        this.member = member;
        member.getTimeCapsules().add(this);
    }
}
