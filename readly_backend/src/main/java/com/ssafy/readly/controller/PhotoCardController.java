package com.ssafy.readly.controller;

import com.ssafy.readly.dto.Book.BookRequest;
import com.ssafy.readly.dto.Book.GetBookResponse;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardRequest;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoCardResponse;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoRequest;
import com.ssafy.readly.dto.PhotoCard.CreatePhotoResponse;
import com.ssafy.readly.entity.Book;
import com.ssafy.readly.entity.Member;
import com.ssafy.readly.entity.PhotoCard;
import com.ssafy.readly.service.AIService;
import com.ssafy.readly.service.book.BookService;
import com.ssafy.readly.service.member.MemberService;
import com.ssafy.readly.service.photocard.PhotoCardService;
import com.ssafy.readly.service.photocard.PhotoCardServiceImpl;
import com.ssafy.readly.service.s3upload.S3FileUploadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;
import org.springframework.web.bind.annotation.RestController;
import org.apache.commons.codec.binary.Base64;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.mock.web.MockMultipartFile;


@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class PhotoCardController {

    private final PhotoCardService PhotoCardServiceImpl;
    private final AIService aiService;
    private final BookService bookService;
    private final MemberService memberService;
    private final PhotoCardService photoCardServiceImpl;
    private final S3FileUploadService s3FileUploadService;

    @PostMapping("/photocard/createimage")
    public ResponseEntity<Map<String, Object>> createPhoto(@RequestBody @Valid CreatePhotoRequest request) throws Exception {
        List<String> imageList = new ArrayList<>();
        log.info(String.valueOf(request.getBookId()));
        log.info(request.getText());
        log.info(String.valueOf(request.getVisibility()));
        log.info(String.valueOf(request.getMemberId()));

        // 책 정보 가져오기
        Book book = bookService.getBookByIdForPhoto(request.getBookId());

        // 멤버 정보 가져오기
        Member member = memberService.getMemberEntity(request.getMemberId());
        // 포토카드 테이블 생성
        PhotoCard photoCard = PhotoCard.builder()
                .book(book)
                .text(request.getText())
                .visibility(request.getVisibility())
                .member(member)
                .build();

        int photoCardId = photoCardServiceImpl.addPhotoCard(photoCard);

        String filename =String.valueOf(photoCardId);

        // 프롬프트 생성 로직 구현

        String prompt = "";
        prompt += book.getTitle() + " 이라는 책에서 ";
        prompt += request.getText() + " 라는 글귀에 어울리는 그림 그려줘";

        // 이미지 생성
        HttpStatus status = HttpStatus.ACCEPTED;
        for (int i = 0; i < 1; i++) {
            String image = aiService.
                    generatePictureV2(prompt);
            String link = s3FileUploadService.uploadFile(stringToMultipartFile(image,filename));
            //response에 넣기
            imageList.add(image);
        }
        //생성된 이미지 return
        Map<String, Object> responseMap = new HashMap<String, Object>();
        CreatePhotoResponse response = new CreatePhotoResponse();
        response.setImages(imageList);
        response.setPhotoCardId(photoCardId);
        responseMap.put("CreatePhotoCardResponse", response);
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }

    @PutMapping("photocard/createcard")
    public ResponseEntity<Map<String, Object>> createPhotoCard(@RequestBody @Valid CreatePhotoCardRequest request) throws Exception {
        log.info(request.toString());
        HttpStatus status = HttpStatus.ACCEPTED;
        CreatePhotoCardResponse response = PhotoCardServiceImpl.createPhotoCard(request);
        Map<String, Object> responseMap = new HashMap<String, Object>();
        responseMap.put("CreatePhotoCardResponse", response);
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }

    @GetMapping("photocard/findbyid/{id}")
    public ResponseEntity<Map<String, Object>> getPhotoCardById(@PathVariable int id) throws Exception {
        log.info(String.valueOf(id));
        HttpStatus status = HttpStatus.ACCEPTED;
        CreatePhotoCardResponse response = PhotoCardServiceImpl.findPhotoCardById(id);
        Map<String, Object> responseMap = new HashMap<String, Object>();
        responseMap.put("PhotoCardResponse", response);
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }

    private MultipartFile stringToMultipartFile(String base64, String filename) throws Exception {
        byte[] image = Base64.decodeBase64(base64);
        int totalCnt = 1024;
        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(totalCnt)) {
            int offset = 0;
            while (offset < image.length) {
                int chunkSize = Math.min(totalCnt, image.length - offset);

                byte[] byteArray = new byte[chunkSize];
                System.arraycopy(image, offset, byteArray, 0, chunkSize);

                byteArrayOutputStream.write(byteArray);
                byteArrayOutputStream.flush();

                offset += chunkSize;
            }

            // ByteArrayOutputStream -> ByteArrayInputStream
            ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());

            // MultipartFile 객체 생성
            MultipartFile multipartFile = new MockMultipartFile(filename, byteArrayInputStream.readAllBytes());


            return multipartFile;
        }
    }
}
