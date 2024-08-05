package com.ssafy.readly.repository.readbook;

import com.ssafy.readly.dto.readbook.ReadBookGroupRequestDTO;
import com.ssafy.readly.dto.readbook.ReadBookRequestDTO;
import com.ssafy.readly.entity.Book;
import com.ssafy.readly.entity.GroupMember;
import com.ssafy.readly.entity.Member;
import com.ssafy.readly.entity.ReadBook;
import com.ssafy.readly.enums.ReadType;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @Override
    public ResponseEntity<?> findReadBooksByGroupId(int groupId) {
        Map<String, Object> response = new HashMap<>();

        TypedQuery<ReadBook> query = em.createQuery("SELECT rb FROM ReadBook rb WHERE rb.group.id = :groupId AND rb.readType = :readType", ReadBook.class);
        query.setParameter("groupId", groupId);
        query.setParameter("readType", ReadType.R);
        List<ReadBook> readBooks = query.getResultList();

        // Collecting the required data
        List<Map<String, Object>> readBooksData = readBooks.stream().map(rb -> {
            Map<String, Object> data = new HashMap<>();
            data.put("id", rb.getId());
            data.put("member_id", rb.getMember().getId());
            data.put("book_id", rb.getBook().getId());
            data.put("current_page", rb.getCurrentPage());
            data.put("read_type", rb.getReadType());
            data.put("group_id", rb.getGroup().getId());

            // Fetch additional member information
            Member member = em.find(Member.class, rb.getMember().getId());
            Map<String, Object> memberInfo = new HashMap<>();
            memberInfo.put("member_id", member.getId());
            memberInfo.put("member_name", member.getMemberName());  // Assuming `name` is a field in `Member` entity

            data.put("member_info", memberInfo);
            return data;
        }).collect(Collectors.toList());

        // Collect book information
        Map<String, Object> bookInfo = new HashMap<>();
        if (!readBooks.isEmpty()) {
            Book book = em.find(Book.class, readBooks.get(0).getBook().getId());
            bookInfo.put("book_id", book.getId());
            bookInfo.put("book_title", book.getTitle()); // Assuming `title` is a field in `Book` entity
            bookInfo.put("book_author", book.getAuthor()); // Assuming `author` is a field in `Book` entity
            bookInfo.put("book_totalPage",book.getTotalPage());
        }

        response.put("readBooks", readBooksData);
        response.put("bookInfo", bookInfo);

        return ResponseEntity.ok(response);
    }
}
