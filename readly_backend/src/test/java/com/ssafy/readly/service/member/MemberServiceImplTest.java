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
import java.util.Optional;

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
        SignUpMemberRequest signUpMember = SignUpMemberRequest.builder()
                .loginId("ehddls")
                .loginPwd("1234")
                .nickname("동동인")
                .memberName("서동인")
                .phoneNumber("000-1111-2222")
                .email("ehddls@naver.com")
                .birthday(LocalDate.of(1996, 7, 25))
                .gender(Gender.M)
                .social(Social.R)
                .build();

        // When
        memberServiceImpl.singnUp(signUpMember);
        Optional<Member> findMember = memberRepositoryImpl.findByLoginId("ehddls");

        // Then
        assertThat(findMember).isPresent();

        findMember.ifPresent(member ->
                assertThat(member.getSocial()).isEqualTo(Social.R));
    }

    @Test
    public void dupcheckDuplicateIdTest() {
        // Given
        SignUpMemberRequest signUpMember = SignUpMemberRequest.builder()
                .loginId("ehddls")
                .loginPwd("1234")
                .nickname("동동인")
                .memberName("서동인")
                .phoneNumber("000-1111-2222")
                .email("ehddls@naver.com")
                .birthday(LocalDate.of(1996, 7, 25))
                .gender(Gender.M)
                .build();

        memberServiceImpl.singnUp(signUpMember);

        // When Then
        assertThrows(IllegalStateException.class, () -> {
            memberServiceImpl.checkDuplicateId("ehddls");
        });
    }
}