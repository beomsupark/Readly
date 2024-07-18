package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Table(name = "Proceedings")
@NoArgsConstructor(access = PROTECTED)
public class Proceeding {

    @Id
    @GeneratedValue
    private int id;
    private LocalDateTime createdDate;
    private String content;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;
}
