package com.ssafy.readly.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static lombok.AccessLevel.*;

@Entity
@Getter
@Table(name="read_books")
@NoArgsConstructor(access = PROTECTED)
public class ReadBook {

    @Id
    @GeneratedValue
    private int id;
    private int currentPage;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "group_id")
    private Group group;

    /* 연관 관계 편의 메소드 */
    public void setMember(Member member){
        if (this.member != null) {
            this.member.getReadBooks().remove(this);
        }

        this.member = member;
        member.getReadBooks().add(this);
    }
}
