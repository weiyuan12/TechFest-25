package com.example.backend.user.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "queries")
public class Query {
    @Id
    private String id;
    private String query;
    private String category;
    private Integer truthScore;
    private String reasoning;
    private String[] citations;
    private LocalDateTime createdAt;

}
