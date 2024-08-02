package com.ssafy.readly.service.readbook;

import com.ssafy.readly.dto.readbook.ReadBookGroupRequestDTO;
import com.ssafy.readly.dto.readbook.ReadBookRequestDTO;

public interface ReadBookService {
    void addUserReadBook(ReadBookRequestDTO readBookRequestDTO) throws Exception;

    void addGroupReadBook(ReadBookGroupRequestDTO readBookGroupRequestDTO) throws Exception;
}
