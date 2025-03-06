package com.example.backend.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

/**
 * Contains fields for CRUD operations on user.
 * Buyer and seller profile fields are populated only during account creation.
 * Updates on buyer and seller profiles are done separately, not through this DTO.
 */
@Getter
@Setter
@Builder
public class UserDTO {
    private String id;
    @NotBlank(message = "Username is required")
    private String username;
}