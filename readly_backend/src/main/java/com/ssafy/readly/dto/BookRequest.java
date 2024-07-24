package com.ssafy.readly.dto;

import lombok.Data;

@Data
public class BookRequest {
    private String Title = "";
    private String Author = "";
    private String ISBN = "";
    private String Description = "";
    private String purchaseLink = "";
    private int totalPage = 0;
    private String image ="";
}
