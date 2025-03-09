package com.example.backend.user.model;

import com.example.backend.user.dto.QueryResponseDTO;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "queries")
public class Query {
    @Id
    private UUID messageId;
    private String query;
    private String category;
    private Integer truthScore;
    private String reasoning;
    private String[] citations;
    private LocalDateTime createdAt;
//    private MultipartFile image;
    private Binary image;
    private String username;

    private QueryResponseDTO.Messages[] messages;

}
