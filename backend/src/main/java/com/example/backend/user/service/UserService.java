package com.example.backend.user.service;

import com.example.backend.user.dto.UserDTO;
import com.example.backend.user.mapper.UserMapper;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;


    public UserDTO test() {
        log.info("testing");
        return UserDTO.builder().id("1").username("testUsername").build();
    }

    public UserDTO test(String userId) {
        log.info("user id is {}", userId);
        UserDTO dto = UserDTO.builder().id("1").username("testUsername").build();

        User user = userMapper.fromUserDTOtoUserForCreate(dto);
        user = userRepository.save(user);
        return dto;
    }
}
