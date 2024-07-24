package com.ssafy.readly.controller;

import com.ssafy.readly.dataCrawling.AladdinOpenAPI;
import com.ssafy.readly.dto.BookRequest;
import com.ssafy.readly.service.BookService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
