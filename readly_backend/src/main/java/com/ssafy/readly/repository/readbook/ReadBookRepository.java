package com.ssafy.readly.repository.readbook;

import com.ssafy.readly.dto.readbook.ReadBookGroupRequestDTO;
import com.ssafy.readly.dto.readbook.ReadBookRequestDTO;

public interface ReadBookRepository {
    void addUserReadBook(ReadBookRequestDTO readBookRequestDTO) throws Exception;

    void addGroupReadBook(ReadBookGroupRequestDTO readBookGroupRequestDTO) throws Exception;
}
