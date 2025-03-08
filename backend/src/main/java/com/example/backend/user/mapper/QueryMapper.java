package com.example.backend.user.mapper;
import com.example.backend.user.dto.ImageDTO;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.backend.user.dto.QueryDTO;
import com.example.backend.user.model.Query;
import org.mapstruct.Named;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@Mapper(componentModel = "spring")
public interface QueryMapper {
    @Mapping(target = "messageId", ignore = true)
    @Mapping(target = "query", source = "text")
    Query fromQueryDTOtoQueryForCreate(QueryDTO queryDTO);

    @Mapping(target = "image", source = "image", qualifiedByName = "multipartFileToBinary")
    @Mapping(target = "id", ignore = true)
    Query fromImageQueryDTOtoQueryForCreate(ImageDTO imageDTO);

    @Named("multipartFileToBinary")
    default Binary multipartFileToBinary(MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            return new Binary(BsonBinarySubType.BINARY, file.getBytes());
        }
        return null;
    }

    @Named("binaryToImageUrl")
    default String binaryToImageUrl(Binary image) {
        if (image != null) {
            return Base64.getEncoder().encodeToString(image.getData());
        }
        return null;
    }
}
