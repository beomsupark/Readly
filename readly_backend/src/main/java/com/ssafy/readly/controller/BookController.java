package com.ssafy.readly.controller;

import com.ssafy.readly.dataCrawling.AladdinOpenAPI;
import com.ssafy.readly.dto.BookRequest;
import com.ssafy.readly.service.BookService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.function.EntityResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class BookController {

    @Autowired
    private BookService bookServiceImpl;

    @PostMapping("/book/addbooks")
    public void addBook() throws Exception {
        AladdinOpenAPI apiBook = new AladdinOpenAPI();
        List<BookRequest> BookList = apiBook.addBooks(10,100);
        System.out.println(BookList.get(0).toString());
        bookServiceImpl.addBooks(BookList);
    }
    // 해당 책 조회
    @GetMapping("/book/searchBook/{bookId}")
    public ResponseEntity<Map<String,Object>> getBookById(@PathVariable int bookId) throws Exception {
        Map<String,Object> responseMap = new HashMap();
        HttpStatus status = HttpStatus.ACCEPTED;
        responseMap.put("book",bookServiceImpl.getBookById(bookId));

        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }
    // 책 전체조회

    // 베스트 셀러 10개 조회

    // 책 자동완성 최대 5개

    // 책 추천

    // 책 추천 AI
}
