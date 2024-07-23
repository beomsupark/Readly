package com.ssafy.readly.controller;

import com.ssafy.readly.dto.member.SignUpMemberRequest;
import com.ssafy.readly.service.member.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberServiceImpl memberService;

    @PostMapping("/member/signup")
    public ResponseEntity<?> singUp(@RequestBody SignUpMemberRequest signUpMember) {
        memberService.singnUp(signUpMember);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
