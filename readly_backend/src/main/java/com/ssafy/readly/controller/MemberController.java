package com.ssafy.readly.controller;

import com.ssafy.readly.dto.member.LoginMemberRequest;
import com.ssafy.readly.dto.member.LoginMemberResponse;
import com.ssafy.readly.dto.member.SignUpMemberRequest;
import com.ssafy.readly.service.member.MemberServiceImpl;
import com.ssafy.readly.util.JWTUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.sasl.AuthenticationException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberServiceImpl memberService;
    private final JWTUtil jwtUtil;

    @PostMapping("/member/signup")
    public ResponseEntity<Map<String, Object>> singUp(@Valid @RequestBody SignUpMemberRequest signUpMember) {
        Map<String, Object> responseMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            memberService.singnUp(signUpMember);
            status = HttpStatus.OK;
        } catch (IllegalStateException i) {
            responseMap.put("errorMessage", i.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(responseMap, status);
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

    @PostMapping("/member/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginMemberRequest loginMember) {
        Map<String, Object> responseMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            LoginMemberResponse loginMemberResponse = memberService.login(loginMember);
            if(loginMemberResponse != null) {
                String accessToken = jwtUtil.createAccessToken(loginMemberResponse.getId());
            }
            status = HttpStatus.OK;
        } catch (AuthenticationException a) {
            responseMap.put("errorMessage", a.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }
}
