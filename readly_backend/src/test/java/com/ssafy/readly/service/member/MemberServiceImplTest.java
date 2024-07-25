package com.ssafy.readly.service.member;

import com.ssafy.readly.dto.member.SignUpMemberRequest;
import com.ssafy.readly.entity.Member;
import com.ssafy.readly.enums.Gender;
import com.ssafy.readly.enums.Social;
import com.ssafy.readly.repository.member.MemberRepositoryImpl;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
class MemberServiceImplTest {

    @Autowired
    EntityManager entityManager;

    @Autowired
    MemberServiceImpl memberServiceImpl;

    @Autowired
    private MemberRepositoryImpl memberRepositoryImpl;

    @Test
    public void signUpTest() {
        // Given
        SignUpMemberRequest signUpMember = createSignUpMember(
                "ehddls",
                "1234",
                "동동인",
                "서동인",
                "000-1111-2222",
                "ehddls@naver.com",
                LocalDate.of(1996, 7, 25),
                Gender.M);

        // When
        memberServiceImpl.singnUp(signUpMember);
        Member findMember = memberRepositoryImpl.findByLoginId("ehddls");

        // Then
        assertThat(findMember.getLoginId()).isEqualTo("ehddls");
        assertThat(findMember.getSocial()).isEqualTo(Social.R);
    }

    @Test
    public void dupcheckDuplicateIdTest() {
        // Given
        SignUpMemberRequest signUpMember = createSignUpMember(
                "ehddls",
                "1234",
                "동동인",
                "서동인",
                "000-1111-2222",
                "ehddls@naver.com",
                LocalDate.of(1996, 7, 25),
                Gender.M);

        memberServiceImpl.singnUp(signUpMember);

        // When Then
        assertThrows(IllegalStateException.class, () -> {
            memberServiceImpl.checkDuplicateId("ehddls");
        });
    }

    private static SignUpMemberRequest createSignUpMember(String loginId, String loginPwd, String nickname, String memberName, String phoneNumber, String email, LocalDate birthday, Gender gender) {
        SignUpMemberRequest request = new SignUpMemberRequest();
        request.setLoginId(loginId);
        request.setLoginPwd(loginPwd);
        request.setNickname(nickname);
        request.setMemberName(memberName);
        request.setPhoneNumber(phoneNumber);
        request.setEmail(email);
        request.setBirthday(birthday);
        request.setGender(gender);
        return request;
    }
}