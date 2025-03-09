package com.example.backend.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder
public class ImageDTO {

    private UUID messageId;

    private MultipartFile files;

    private String username;
}
