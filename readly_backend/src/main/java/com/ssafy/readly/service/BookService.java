package com.ssafy.readly.service;

import com.ssafy.readly.dto.Book.GetBookByIdResponse;
import com.ssafy.readly.dto.BookRequest;
import com.ssafy.readly.entity.Book;

import java.util.List;

public interface BookService {
    public void addBooks(List<BookRequest> bookList) throws Exception;

    public GetBookByIdResponse getBookById(int bookId) throws Exception;
}
