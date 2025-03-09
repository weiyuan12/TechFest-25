package com.example.backend.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

/**
 * Contains common user details and additional ids to query for more information
 * if needed.
 */
@Getter
@Setter
public class QueryResponseDTO {
    private UUID messageId;
    private String text;
    private String category;
    private Integer truthscore;
    private String reasoning;
    private String[] citations;
    private LocalDateTime createdAt;
}