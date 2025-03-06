package com.example.backend.user.mapper;

import com.example.backend.user.dto.UserDTO;
import com.example.backend.user.model.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-03-06T16:52:30+0800",
    comments = "version: 1.5.2.Final, compiler: Eclipse JDT (IDE) 3.41.0.z20250213-2037, environment: Java 23.0.1 (Amazon.com Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User fromUserDTOtoUserForCreate(UserDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        User user = new User();

        user.setUsername( userDTO.getUsername() );

        return user;
    }
}
