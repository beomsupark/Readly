package com.ssafy.readly.dto.mypage;

import lombok.Data;

@Data
public class UpdateCurrentPageRequest {
    private int readBookId;
    private int currentPage;

}
