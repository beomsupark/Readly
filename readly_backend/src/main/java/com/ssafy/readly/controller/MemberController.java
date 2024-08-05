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
    public ResponseEntity<?> singUp(@Valid @RequestBody SignUpMemberRequest signUpMember) throws Exception {
        memberService.singnUp(signUpMember);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/member/duplicate/{loginid}")
    public ResponseEntity<?> checkDuplicateId(@PathVariable("loginid") String loginId) throws Exception {
        memberService.checkDuplicateId(loginId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/member/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginMemberRequest loginMember) throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;

        LoginMemberResponse loginMemberResponse = memberService.login(loginMember);

        String accessToken = jwtUtil.createAccessToken(loginMemberResponse.getId());
        String refreshToken = jwtUtil.createRefreshToken(loginMemberResponse.getId());
        memberService.saveRefreshToken(loginMemberResponse.getId(), refreshToken);

        responseMap.put("accessToken", accessToken);
        responseMap.put("refreshToken", refreshToken);
        responseMap.put("loginInfo", loginMemberResponse);

        status = HttpStatus.CREATED;

        return new ResponseEntity<Map<String, Object>>(responseMap, status);
    }

    @GetMapping("/member/{id}")
    public ResponseEntity<Map<String, Object>> getMemberInfo(
            @PathVariable("id") int id, HttpServletRequest request) throws Exception {
        Map<String, Object> responseMap = new HashMap<>();
        HttpStatus status = HttpStatus.ACCEPTED;
        if(jwtUtil.checkToken(request.getHeader("Authorization"))) {
            MemberResponse memberResponse = memberService.getMember(id);
            responseMap.put("memberInfo", memberResponse);
            status = HttpStatus.OK;
        } else {
            responseMap.put("errorMessage", "토큰이 유효하지 않습니다.");
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
    public ResponseEntity<?> updateMember(@RequestBody UpdateMemberRequest updateMemberRequest) throws Exception {
        memberService.updateMember(updateMemberRequest);
        return new ResponseEntity<Map<String, Object>>(HttpStatus.OK);
    }

}
