package com.ssafy.readly.controller;

import com.ssafy.readly.dto.readbook.ReadBookGroupRequestDTO;
import com.ssafy.readly.dto.readbook.ReadBookRequestDTO;
import com.ssafy.readly.service.readbook.ReadBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReadBookController {
    private final ReadBookService readBookService;

    @PostMapping("/user/add")
    public void addUserReadBook(@RequestBody ReadBookRequestDTO readBookRequestDTO) throws Exception {
        readBookService.addUserReadBook(readBookRequestDTO);
    }

    @PostMapping("/group/add")
    public void addGroupReadBook(@RequestBody ReadBookGroupRequestDTO readBookGroupRequestDTO) throws Exception {
        readBookService.addGroupReadBook(readBookGroupRequestDTO);
    }
}
