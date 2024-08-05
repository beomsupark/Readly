package com.ssafy.readly.controller;

import com.ssafy.readly.dto.member.*;
import com.ssafy.readly.service.member.MemberServiceImpl;
import com.ssafy.readly.util.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
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
                String refreshToken = jwtUtil.createRefreshToken(loginMemberResponse.getId());

                memberService.saveRefreshToken(loginMemberResponse.getId(), refreshToken);

                responseMap.put("accessToken", accessToken);
                responseMap.put("refreshToken", refreshToken);
                responseMap.put("loginInfo", loginMemberResponse);

                status = HttpStatus.CREATED;
            } else {
                responseMap.put("errorMessage", "아이디 또는 비밀번호를 확인해주세요.");
                status = HttpStatus.UNAUTHORIZED;
            }
        } catch (Exception e) {
            responseMap.put("errorMessage", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }

    @GetMapping("/member/{id}")
    public ResponseEntity<Map<String, Object>> getMemberInfo(
            @PathVariable("id") int id, HttpServletRequest request) {
        Map<String, Object> responseMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        if(jwtUtil.checkToken(request.getHeader("Authorization"))) {
            try {
                MemberResponse memberResponse = memberService.getMember(id);
                responseMap.put("memberInfo", memberResponse);
                status = HttpStatus.OK;
            } catch (Exception e) {
                responseMap.put("errorMessage", e.getMessage());
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        } else {
            status = HttpStatus.UNAUTHORIZED;
        }
        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }

    @DeleteMapping("/member/{id}/logout")
    public ResponseEntity<?> logout(@PathVariable("id") int id) throws Exception {
        memberService.deleteRefreshToken(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/member/{id}/refresh")
    public ResponseEntity<Map<String, Object>> refreshToken(
            @PathVariable("id") int id, HttpServletRequest request) {
        Map<String, Object> responseMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        String refreshToken = request.getHeader("refreshToken");
        if(jwtUtil.checkToken(refreshToken)) {
            if (refreshToken.equals(memberService.getRefreshToken(id))) {
                String accessToken = jwtUtil.createAccessToken(id);
                responseMap.put("accessToken", accessToken);
                status = HttpStatus.CREATED;
            }
        } else {
            status = HttpStatus.UNAUTHORIZED;
        }

        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }

    @PatchMapping("/member")
    public ResponseEntity<Map<String, Object>> updateMember(@RequestBody UpdateMemberRequest updateMemberRequest) {
        Map<String, Object> responseMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        try {
            memberService.updateMember(updateMemberRequest);
            status = HttpStatus.OK;
        } catch (Exception e) {
            responseMap.put("errorMessage", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }

}
