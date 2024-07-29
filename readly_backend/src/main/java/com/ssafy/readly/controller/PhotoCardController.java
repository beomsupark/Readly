package com.ssafy.readly.controller;

import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardRequest;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoRequest;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoResponse;
import com.ssafy.readly.service.AIService;
import com.ssafy.readly.service.photocard.PhotoCardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.*;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequiredArgsConstructor
@Slf4j
public class PhotoCardController {

    private final PhotoCardService PhotoCardServiceImpl;
    private final AIService aiService;

    @PostMapping("/photocard/createimage")
    public ResponseEntity<Map<String, Object>> createPhoto(@RequestBody @Valid CreatePhotoRequest request) throws IOException, InterruptedException {
        List<String> photoCardlist = new ArrayList<>();
        //log.info(request.getBookId());
        //log.info(request.getText());
        //log.info(String.valueOf(request.getVisibility()));
        /*

        // 책 정보 가져오기

        // 멤버 정보 가져오기

        // 포토카드 테이블 생성
        PhotoCard photoCard = PhotoCard.builder()
                .book()
                .text(request.getText())
                .visibility(request.getVisibility())
                .member()
                .build();

        */

        // 프롬프트 생성 로직 구현

        // 이미지 생성
        HttpStatus status = HttpStatus.ACCEPTED;
        for (int i = 0; i < 1; i++) {
            String prompt = aiService.
                    generatePictureV2(request.getText());
            //response에 넣기
            photoCardlist.add(prompt);
        }
        //생성된 이미지 return
        Map<String, Object> responseMap = new HashMap<String, Object>();
        CreatePhotoResponse response = new CreatePhotoResponse();
        response.setImages(photoCardlist);
        responseMap.put("CreatePhotoCardResponse", response);
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }

    @PutMapping("photocard/createcard")
    public ResponseEntity<Map<String, Object>> createPhotoCard(@RequestBody @Valid CreatePhotoCardRequest request) throws Exception {
        HttpStatus status = HttpStatus.ACCEPTED;
        CreatePhotoCardResponse response = PhotoCardServiceImpl.createPhotoCard(request);
        Map<String, Object> responseMap = new HashMap<String, Object>();
        responseMap.put("CreatePhotoCardResponse", response);
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }
}
