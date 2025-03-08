package com.example.backend.user.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class QueryDTO {
    private UUID id;
    @NotBlank(message = "Username is required")
    private String text;
}
