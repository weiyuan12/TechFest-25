package com.example.backend.user.dto;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.UUID;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class QueryResponseToFE {

    private UUID messageId;
    private String query;
    private String category;
    private Integer truthscore;
    private String reasoning;
    private String[] citations;
    private LocalDateTime createdAt;
//    private MultipartFile image;
    private String image;
    private String username;

    private QueryResponseDTO.Messages[] messages;
    
}
