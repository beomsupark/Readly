package com.ssafy.readly.service;

import com.ssafy.readly.dto.BookRequest;
import com.ssafy.readly.entity.Book;

import java.util.List;

public interface BookService {
    public void addBooks(List<BookRequest> bookList) throws Exception;
}
