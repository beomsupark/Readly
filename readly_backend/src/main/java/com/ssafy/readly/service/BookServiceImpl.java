package com.ssafy.readly.service;

import com.ssafy.readly.dto.Book.GetBookByIdResponse;
import com.ssafy.readly.dto.BookRequest;
import com.ssafy.readly.entity.Book;
import com.ssafy.readly.repository.BookRepositoy;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepositoy bookRepositoy;


    @Override

    public void addBooks(List<BookRequest> bookList) throws Exception {
        List<Book> books = new ArrayList<>();
        for (BookRequest bookRequest : bookList) {
            System.out.println(bookRequest.toString());
            Book book = Book.builder()
                    .title(bookRequest.getTitle())
                    .author(bookRequest.getAuthor())
                    .isbn(bookRequest.getISBN())
                    .detail(bookRequest.getDescription())
                    .purchaseLink(bookRequest.getPurchaseLink())
                    .totalPage(bookRequest.getTotalPage())
                    .image(bookRequest.getImage())
                    .build();
            System.out.println(book.toString());
            System.out.println("-------------------------");
            books.add(book);
        }
        bookRepositoy.saveAll(books);
    }

    /**
     * @param bookId
     * @return
     * @throws Exception
     */
    @Override
    public GetBookByIdResponse getBookById(int bookId) throws Exception {
        Book responseBook = bookRepositoy.findById(bookId).orElseThrow(IllegalArgumentException::new);
        return new GetBookByIdResponse(responseBook);
    }
}
