package com.ssafy.readly.controller;

import com.ssafy.readly.dto.rank.GetRankGroupResponse;
import com.ssafy.readly.dto.rank.GetRankUserResponse;
import com.ssafy.readly.service.rank.RankService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class RankController {

    private final RankService rankService;

    @GetMapping("/rankUser")
    public ResponseEntity<?> getRankUser() {
        try {
            List<GetRankUserResponse> rankMembers = rankService.getMembers();
            if(rankMembers != null && !rankMembers.isEmpty()) {
                return new ResponseEntity<List<GetRankUserResponse>>(rankMembers, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }

    }

    @GetMapping("/rankGroup")
    public ResponseEntity<?> getRankGroup() {
        try {
            List<GetRankGroupResponse> rankGroups = rankService.getGroups();
            if(rankGroups != null && !rankGroups.isEmpty()) {
                return new ResponseEntity<List<GetRankGroupResponse>>(rankGroups, HttpStatus.OK);
            } else {
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            return exceptionHandling(e);
        }

    }

    private ResponseEntity<String> exceptionHandling(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<String>("Error : " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
