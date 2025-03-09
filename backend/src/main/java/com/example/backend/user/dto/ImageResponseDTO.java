package com.example.backend.user.dto;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ImageResponseDTO {
    private List<Message> messages;

    @JsonProperty("structured_response")
    private StructuredResponse structuredResponse;

    @Getter @Setter
    public static class Message {
        private String content;
        private QueryResponseDTO.AdditionalKwargs additionalKwargs;
        private QueryResponseDTO.ResponseMetadata responseMetadata;
        private String type;
        private String name;
        private String id;
        private boolean example;
        private QueryResponseDTO.ToolCall[] toolCalls;
        private QueryResponseDTO.ToolCall[] invalidToolCalls;
        private UsageMetadata usageMetadata;
    }

    @Getter @Setter
    public static class StructuredResponse {
        private String category;
        private Integer truthscore;
        private String reasoning;
        private List<String> citations;
    }

    @Getter @Setter
    public static class UsageMetadata {
        private Integer inputTokens;
        private Integer outputTokens;
        private Integer totalTokens;
        private Map<String, Integer> inputTokenDetails;
        private Map<String, Integer> outputTokenDetails;
    }
}
