package com.example.backend.user.service;

import com.example.backend.user.dto.ImageDTO;
import lombok.extern.slf4j.Slf4j;

import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.backend.user.client.PythonServiceClient;
import com.example.backend.user.dto.QueryDTO;
import com.example.backend.user.dto.QueryResponseDTO;
import com.example.backend.user.dto.QueryResponseToFE;
import com.example.backend.user.mapper.QueryMapper;
import com.example.backend.user.model.Query;
import com.example.backend.user.repository.QueryRepository;
import com.example.backend.user.dto.ImageResponseDTO;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class QueryService {
    private final QueryRepository queryRepository;
    private final QueryMapper queryMapper;
    private final PythonServiceClient pythonServiceClient;

    public Query createQueryForText(QueryDTO queryDTO) {
        queryDTO.setMessageId(UUID.randomUUID());
        queryDTO.setUsername(queryDTO.getUsername());
        Query query = queryMapper.fromQueryDTOtoQueryForCreate(queryDTO);
        query.setCreatedAt(LocalDateTime.now());
        query.setMessageId(queryDTO.getMessageId());

        log.info("userQuery: {}", query);
        // call llm
        QueryResponseDTO response = pythonServiceClient.postText(queryDTO);
        log.info("response: {}", response);
        query.setMessages(response.getMessages());

        // set the values after calling llm
        query.setCategory(response.getStructuredResponse().getCategory());
        query.setTruthscore(response.getStructuredResponse().getTruthscore());
        query.setReasoning(response.getStructuredResponse().getReasoning());
        query.setCitations(response.getStructuredResponse().getCitations());
        queryRepository.save(query);
        return query;
    }
    public List<QueryResponseToFE> getAllQueriesByUser(String username) {
        List<Query> queries = queryRepository.findByUsername(username);
        return queries.stream().map(query -> new QueryResponseToFE(
            query.getMessageId(),
            query.getQuery(),
            query.getCategory(),
            query.getTruthscore(),
            query.getReasoning(),
            query.getCitations(),
            query.getCreatedAt(),
            query.getImage() != null ? Base64.getEncoder().encodeToString(query.getImage().getData()) : null, // Convert Binary to Base64
            query.getUsername(),
            query.getMessages()
        )).collect(Collectors.toList());
    }
    public List<Query> getAllQueries() {
        List<Query> queries = queryRepository.findAll(Sort.by(Sort.Order.desc("createdAt")));
        return queries;
    }

    // public Query createQueryForImage(ImageDTO imageDTO){
    // Query query = queryMapper.fromImageQueryDTOtoQueryForCreate(imageDTO);
    // query.setCreatedAt(LocalDateTime.now());
    //
    // log.info("userQuery: {}", query);
    // // call llm
    //
    //
    // // set the values after calling llm
    // query.setCategory("CATEGORY");
    // query.setTruthScore(1);
    // query.setReasoning("REASONING");
    // String[] citations = {"lousy", "fake media outlet"};
    // query.setCitations(citations);
    // queryRepository.save(query);
    // return query;
    // }

    public Query createQueryForImage2(ImageDTO image) {
        Query query = queryMapper.fromImageQueryDTOtoQueryForCreate(image);
        query.setMessageId(UUID.randomUUID());
        query.setCreatedAt(LocalDateTime.now());
        query.setUsername(image.getUsername());
        if (image.getFiles() != null && !image.getFiles().isEmpty()) {
            try {
                query.setImage(new Binary(image.getFiles().getBytes()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        ImageResponseDTO response = pythonServiceClient.postImage(image.getFiles(), query.getMessageId().toString());
//        System.out.println(response);

        // set the values after calling llm
        query.setCategory(response.getStructuredResponse().getCategory());
        query.setTruthscore(response.getStructuredResponse().getTruthscore());
        query.setReasoning(response.getStructuredResponse().getReasoning());

        // Convert List<String> to String[] if necessary, depending on your Query class
        List<String> citationsList = response.getStructuredResponse().getCitations();
        String[] citationsArray = citationsList != null ?
                citationsList.toArray(new String[0]) :
                new String[0];
        query.setCitations(citationsArray);

        queryRepository.save(query);
        return query;
    }

}
