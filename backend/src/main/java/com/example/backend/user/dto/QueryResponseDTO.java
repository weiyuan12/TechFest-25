package com.example.backend.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

/**
 * Contains common user details and additional ids to query for more information
 * if needed.
 */
@Getter
@Setter
public class QueryResponseDTO {
    private Messages[] messages;
    @JsonProperty("structured_response")
    private StructuredResponse structuredResponse;

    @Getter
    @Setter
    public static class Messages {
        private String content;
        private AdditionalKwargs additionalKwargs;
        private ResponseMetadata responseMetadata;
        private String type;
        private String name;
        private String id;
        private boolean example;
        private ToolCall[] toolCalls;
        private ToolCall[] invalidToolCalls;
        private UsageMetadata usageMetadata;
    }

    @Getter
    @Setter
    public static class AdditionalKwargs {
        private String refusal;
    }

    @Getter
    @Setter
    public static class ResponseMetadata {
        private TokenUsage tokenUsage;
        private String modelName;
        private String systemFingerprint;
        private String finishReason;
        private String logprobs;
    }

    @Getter
    @Setter
    public static class TokenUsage {
        private int completionTokens;
        private int promptTokens;
        private int totalTokens;
        private CompletionTokensDetails completionTokensDetails;
        private PromptTokensDetails promptTokensDetails;
    }

    @Getter
    @Setter
    public static class CompletionTokensDetails {
        private int acceptedPredictionTokens;
        private int audioTokens;
        private int reasoningTokens;
        private int rejectedPredictionTokens;
    }

    @Getter
    @Setter
    public static class PromptTokensDetails {
        private int audioTokens;
        private int cachedTokens;
    }

    @Getter
    @Setter
    public static class UsageMetadata {
        private int inputTokens;
        private int outputTokens;
        private int totalTokens;
        private InputTokenDetails inputTokenDetails;
        private OutputTokenDetails outputTokenDetails;
    }

    @Getter
    @Setter
    public static class InputTokenDetails {
        private int audio;
        private int cacheRead;
    }

    @Getter
    @Setter
    public static class OutputTokenDetails {
        private int audio;
        private int reasoning;
    }

    @Getter
    @Setter
    public static class ToolCall {
        // Add properties if needed based on the actual response
    }

    @Getter
    @Setter
    public static class StructuredResponse {
        private String category;
        private Integer truthscore; // Using Integer to handle null values
        private String reasoning;
        private String[] citations;
    }
}