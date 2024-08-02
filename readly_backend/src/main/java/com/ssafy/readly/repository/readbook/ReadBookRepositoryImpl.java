package com.ssafy.readly.repository.readbook;

import com.ssafy.readly.dto.readbook.ReadBookGroupRequestDTO;
import com.ssafy.readly.dto.readbook.ReadBookRequestDTO;
import com.ssafy.readly.entity.Book;
import com.ssafy.readly.entity.GroupMember;
import com.ssafy.readly.entity.Member;
import com.ssafy.readly.entity.ReadBook;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReadBookRepositoryImpl implements ReadBookRepository{

    private final EntityManager em;

    @Override
    public void addUserReadBook(ReadBookRequestDTO readBookRequestDTO) {
        int memberId = readBookRequestDTO.getMemberId();
        int bookId = readBookRequestDTO.getBookId();

        Member member = em.find(Member.class, memberId);
        Book book = em.find(Book.class, bookId);

        if (member == null) {
            throw new IllegalArgumentException("잘못된 멤버 ID입니다.");
        }

        if (book == null) {
            throw new IllegalArgumentException("잘못된 책 ID입니다.");
        }

        ReadBook readBook = new ReadBook();
        readBook.setMember(member);
        readBook.setBook(book);
        readBook.setCurrentPage(0);

        em.persist(readBook);
    }
    @Override
    public void addGroupReadBook(ReadBookGroupRequestDTO readBookGroupRequestDTO){
        int groupId = readBookGroupRequestDTO.getGroupId();
        int bookId = readBookGroupRequestDTO.getBookId();

        TypedQuery<GroupMember> query = em.createQuery("SELECT gm FROM GroupMember gm WHERE gm.group.id = :groupId", GroupMember.class);
        query.setParameter("groupId", groupId);
        List<GroupMember> groupMembers = query.getResultList();

        Book book = em.find(Book.class, bookId);

        if (book == null) {
            throw new IllegalArgumentException("Invalid book ID");
        }

        for (GroupMember groupMember : groupMembers) {
            ReadBook readBook = new ReadBook();
            readBook.setMember(groupMember.getMember());
            readBook.setBook(book);
            readBook.setCurrentPage(0);
            readBook.setGroup(groupMember.getGroup());  // 그룹 설정 추가
            em.persist(readBook);
        }
    }
}
