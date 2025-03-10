package com.example.backend.user.mapper;

import com.example.backend.user.dto.UserDTO;
import com.example.backend.user.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    // Map UserDTO to User for creation (only username and id mapped here)
    @Mapping(target = "id", ignore = true) // ID will likely be generated by MongoDB or another service
    @Mapping(target = "username", source = "username")
    User fromUserDTOtoUserForCreate(UserDTO userDTO);

    // You can add additional mappings for updates if required, e.g., for a scenario where the username is updated
}
