package com.example.backend.user.service;

import com.example.backend.user.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    public UserDTO test() {
        log.info("testing");
        return UserDTO.builder().id("1").username("testUsername").build();
    }

    public UserDTO test(String userId) {
        log.info("user id is {}", userId);
        return UserDTO.builder().id("1").username("testUsername").build();
    }
}
