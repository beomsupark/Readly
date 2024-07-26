package com.ssafy.readly.dto.group;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
public class GetGroupResponse {
    private int groupId;
    private String title;
    private String description;
    private LocalDateTime createdDate;
    private Set<String> tags; // 태그 이름 목록



    public GetGroupResponse(int id, String title, String description, LocalDateTime createdDate, Set<String> tags) {
        this.groupId = id;
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
        this.tags = tags;
    }
}
