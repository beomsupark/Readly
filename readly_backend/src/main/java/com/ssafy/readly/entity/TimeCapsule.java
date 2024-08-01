package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.*;

@Entity
@Getter
@Table(name="timecapsules")
@NoArgsConstructor(access = PROTECTED)
public class TimeCapsule {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;
    private LocalDateTime releaseDate;
    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "timeCapsule", cascade = CascadeType.ALL)
    private List<TimeCapsuleItem> timeCapsuleItems = new ArrayList<>();

    public TimeCapsule(LocalDate startDate, LocalDate endDate, Member member) {
        this.startDate = startDate;
        this.endDate = endDate;
        createReleaseDate();
        setMember(member);
    }

    /* 연관 관계 편의 메소드 */
    public void setMember(Member member){
        if (this.member != null) {
            this.member.getTimeCapsules().remove(this);
        }

        this.member = member;
        member.getTimeCapsules().add(this);
    }

    public void createReleaseDate() {
        Random random = new Random();
        int addMonth = random.nextInt(12) + 1;
        this.releaseDate = LocalDateTime.now().plusMonths(addMonth);
    }
}
