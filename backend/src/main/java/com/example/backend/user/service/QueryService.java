package com.example.backend.user.service;

import com.example.backend.user.dto.ImageDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.backend.user.dto.QueryDTO;
import com.example.backend.user.mapper.QueryMapper;
import com.example.backend.user.model.Query;
import com.example.backend.user.repository.QueryRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class QueryService {
    private final QueryRepository queryRepository;
    private final QueryMapper queryMapper;

    public Query createQueryForText(QueryDTO queryDTO){
        Query query = queryMapper.fromQueryDTOtoQueryForCreate(queryDTO);
        query.setCreatedAt(LocalDateTime.now());

        log.info("userQuery: {}", query);
        // call llm


        // set the values after calling llm
        query.setCategory("CATEGORY");
        query.setTruthScore(1);
        query.setReasoning("REASONING");
        String[] citations = {"lousy", "fake media outlet"};
        query.setCitations(citations);
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

    public Query createQueryForImage2(MultipartFile image){
        Query query = queryMapper.fromImageQueryDTOtoQueryForCreate(ImageDTO.builder().image(image).build());
        query.setCreatedAt(LocalDateTime.now());
        System.out.println(query);
        log.info("query = {}", query);

        // call llm


        // set the values after calling llm
        query.setCategory("CATEGORY");
        query.setTruthScore(1);
        query.setReasoning("REASONING");
        String[] citations = {"lousy", "fake media outlet"};
        query.setCitations(citations);
        queryRepository.save(query);
        return query;
    }

}
