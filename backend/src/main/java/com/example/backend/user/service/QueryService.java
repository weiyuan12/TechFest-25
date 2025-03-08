package com.example.backend.user.service;

import com.example.backend.user.dto.ImageDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.backend.user.client.PythonServiceClient;
import com.example.backend.user.dto.QueryDTO;
import com.example.backend.user.dto.QueryResponseDTO;
import com.example.backend.user.mapper.QueryMapper;
import com.example.backend.user.model.Query;
import com.example.backend.user.repository.QueryRepository;
import com.example.backend.user.dto.ImageResponseDTO;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class QueryService {
    private final QueryRepository queryRepository;
    private final QueryMapper queryMapper;
    private final PythonServiceClient pythonServiceClient;

    public Query createQueryForText(QueryDTO queryDTO){
        queryDTO.setMessageId(UUID.randomUUID());
        Query query = queryMapper.fromQueryDTOtoQueryForCreate(queryDTO);
        query.setCreatedAt(LocalDateTime.now());
        query.setMessageId(queryDTO.getMessageId());

        log.info("userQuery: {}", query);
        // call llm
        QueryResponseDTO response = pythonServiceClient.postText(queryDTO);

        // set the values after calling llm
        query.setCategory(response.getCategory());
        query.setTruthScore(response.getTruthScore());
        query.setReasoning(response.getReasoning());
        query.setCitations(response.getCitations());
        queryRepository.save(query);
        return query;
    }

    public List<Query> getAllQueries() {
        List<Query> queries = queryRepository.findAll(Sort.by(Sort.Order.desc("createdAt")));
        return queries;
    }

//    public Query createQueryForImage(ImageDTO imageDTO){
//        Query query = queryMapper.fromImageQueryDTOtoQueryForCreate(imageDTO);
//        query.setCreatedAt(LocalDateTime.now());
//
//        log.info("userQuery: {}", query);
//        // call llm
//
//
//        // set the values after calling llm
//        query.setCategory("CATEGORY");
//        query.setTruthScore(1);
//        query.setReasoning("REASONING");
//        String[] citations = {"lousy", "fake media outlet"};
//        query.setCitations(citations);
//        queryRepository.save(query);
//        return query;
//    }

     public Query createQueryForImage2(ImageDTO image){
         Query query = queryMapper.fromImageQueryDTOtoQueryForCreate(image);
         query.setMessageId(UUID.randomUUID());
         query.setCreatedAt(LocalDateTime.now());
         System.out.println(query);
         ImageResponseDTO response = pythonServiceClient.postImage(image.getFiles(), query.getMessageId().toString());
         System.out.println(response);


         // set the values after calling llm
        query.setCategory(response.getCategory());
        query.setTruthScore(response.getTruthScore());
        query.setReasoning(response.getReasoning());
        query.setCitations(response.getCitations());
         queryRepository.save(query);
         return query;
     }

}
