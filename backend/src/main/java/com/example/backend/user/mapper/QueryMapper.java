package com.example.backend.user.mapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.backend.user.dto.QueryDTO;
import com.example.backend.user.model.Query;

@Mapper(componentModel = "spring")
public interface QueryMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "query", source = "text")
    Query fromQueryDTOtoQueryForCreate(QueryDTO queryDTO);
}
