package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Table(name="bad_dates")
@NoArgsConstructor(access = PROTECTED)
public class BadDate {

    @Id
    @GeneratedValue
    private int id;
    private LocalDate badDate;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="group_id")
    private Group group;

    /* 연관 관계 편의 메소드 */
    public void setGroup(Group group){
        if (this.group != null) {
            this.group.getBadDates().remove(this);
        }

        this.group = group;
        group.getBadDates().add(this);
    }
}
