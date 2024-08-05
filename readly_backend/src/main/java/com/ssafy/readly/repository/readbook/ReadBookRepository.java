package com.ssafy.readly.repository.readbook;

import com.ssafy.readly.dto.readbook.ReadBookGroupRequestDTO;
import com.ssafy.readly.dto.readbook.ReadBookRequestDTO;
import org.springframework.http.ResponseEntity;

public interface ReadBookRepository {
    void addUserReadBook(ReadBookRequestDTO readBookRequestDTO) throws Exception;

    void addGroupReadBook(ReadBookGroupRequestDTO readBookGroupRequestDTO) throws Exception;

    ResponseEntity<?> findReadBooksByGroupId(int groupId) throws Exception;
}
