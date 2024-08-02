package com.ssafy.readly.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.*;

@Entity
@Getter
@Table(name="read_books")
public class ReadBook {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private int id;

    @Column(name = "current_page")
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

    public void setBook(Book book) {
        if (this.book != null) {
            this.book.getReadBooks().remove(this);
        }

        this.book = book;
        book.getReadBooks().add(this);
    }

    public void setGroup(Group group) {
        if (this.group != null) {
            this.group.getReadBooks().remove(this);
        }
        this.group = group;
        group.getReadBooks().add(this);
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }
}