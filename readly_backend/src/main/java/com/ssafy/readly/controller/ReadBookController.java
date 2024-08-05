package com.ssafy.readly.controller;

import com.ssafy.readly.dto.readbook.ReadBookGroupRequestDTO;
import com.ssafy.readly.dto.readbook.ReadBookRequestDTO;
import com.ssafy.readly.service.readbook.ReadBookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/group/read-books/{groupId}")
    public ResponseEntity<?> getReadBooksByGroupId(@PathVariable int groupId) throws Exception {
        return readBookService.findReadBooksByGroupId(groupId);
    }
}
