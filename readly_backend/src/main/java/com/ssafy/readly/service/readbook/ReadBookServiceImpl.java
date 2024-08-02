package com.ssafy.readly.service.readbook;

import com.ssafy.readly.dto.readbook.ReadBookGroupRequestDTO;
import com.ssafy.readly.dto.readbook.ReadBookRequestDTO;
import com.ssafy.readly.repository.readbook.ReadBookRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Transactional
public class ReadBookServiceImpl implements ReadBookService{
    private final ReadBookRepository readBookRepository;

    @Override
    public void addUserReadBook(ReadBookRequestDTO readBookRequestDTO) throws Exception {
        readBookRepository.addUserReadBook(readBookRequestDTO);
    }

    @Override
    public void addGroupReadBook(ReadBookGroupRequestDTO readBookGroupRequestDTO) throws Exception {
        readBookRepository.addGroupReadBook(readBookGroupRequestDTO);
    }
}
