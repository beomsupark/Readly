package com.ssafy.readly.controller;

import com.ssafy.readly.dto.member.SignUpMemberRequest;
import com.ssafy.readly.service.member.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberServiceImpl memberService;

    @PostMapping("/member/signup")
    public ResponseEntity<?> singUp(@RequestBody SignUpMemberRequest signUpMember) {
        memberService.singnUp(signUpMember);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/member/duplicate/{loginid}")
    public ResponseEntity<Map<String, Object>> checkDuplicateId(@PathVariable("loginid") String loginId) {
        Map<String, Object> responseMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            memberService.checkDuplicateId(loginId);
            status = HttpStatus.OK;
        } catch (IllegalStateException i) {
            responseMap.put("errorMessage", i.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }
}