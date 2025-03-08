package com.example.backend.user.dto;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageResponseDTO {

    private UUID messageId;
    private String category;
    private Integer truthScore;
    private String reasoning;
    private String[] citations;
    
}
