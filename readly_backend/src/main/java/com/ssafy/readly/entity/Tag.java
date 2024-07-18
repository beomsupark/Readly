package com.ssafy.readly.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.*;

@Entity
@Getter
@Table(name="tags")
@NoArgsConstructor(access = PROTECTED)
public class Tag {

    @Id
    @GeneratedValue
    private int id;
    private String name;
}
