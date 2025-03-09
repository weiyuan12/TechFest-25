package com.example.backend.user.dto;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageResponseDTO {

    private UUID messageId;
    private String category;
    private Integer truthscore;
    private String reasoning;
    private String[] citations;

}
