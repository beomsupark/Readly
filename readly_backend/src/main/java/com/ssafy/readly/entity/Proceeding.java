package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Table(name = "proceedings")
@NoArgsConstructor(access = PROTECTED)
public class Proceeding {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;
    private LocalDateTime createdDate;
    private String content;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    /* 연관 관계 편의 메소드 */
    public void setGroup(Group group){
        if (this.group != null) {
            this.group.getProceedings().remove(this);
        }

        this.group = group;
        group.getProceedings().add(this);
    }
}
