package com.ssafy.starry.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.request.HttpRequestWithBody;
import com.ssafy.starry.common.utils.DataLabHttp;
import com.ssafy.starry.common.utils.PropertiesLoader;
import com.ssafy.starry.common.utils.RestClient;
import com.ssafy.starry.controller.dto.SearchDto;
import com.ssafy.starry.controller.dto.SearchFlowDto;
import com.ssafy.starry.controller.dto.WordResponseDto;
import com.ssafy.starry.controller.dto.WordResponseDto.Word;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WordService {

    static String RelKwdPath = "/keywordstool";
    static String DataLabPath = "https://openapi.naver.com/v1/datalab/search";

    public SearchDto getWordAnalysis(String word) {
        SearchDto searchDto = null;
        WordResponseDto words = null;
        try {
            Properties properties = PropertiesLoader.fromResource("secret.properties");
            String baseUrl = properties.getProperty("BASE_URL");
            String apiKey = properties.getProperty("API_KEY");
            String secretKey = properties.getProperty("SECRET_KEY");
            String clientId = properties.getProperty("CLIENT_ID");
            String clientSecret = properties.getProperty("CLIENTSECRET");
            System.out.println("URL : " + baseUrl);
            System.out.println("apiKey : " + apiKey);
            System.out.println("secretKey : " + secretKey);
            long customerId = Long.parseLong(properties.getProperty("CUSTOMER_ID"));
            RestClient rest = RestClient.of(baseUrl, apiKey, secretKey);

            words = list(rest, customerId, word);
            System.out.println(words.toString());
            if (words.getKeywordList().size() > 20) {
                words.setKeywordList(words.getKeywordList().subList(0, 20));
            }
            List<String> keywords = new ArrayList<>();
            for (Word w : words.getKeywordList()) {
                keywords.add(w.getRelKeyword());
            }
            SearchFlowDto searchFlowDto = getDataTrend(word, keywords.toArray(new String[0]),
                clientId,
                clientSecret);
            System.out.println(searchFlowDto);
            searchDto = new SearchDto(words, searchFlowDto);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return searchDto;
    }

    public WordResponseDto list(RestClient rest, long customerId, String hintKeywords)
        throws Exception {
        HttpResponse<String> response =
            rest.get(RelKwdPath, customerId)
                .queryString("showDetail", 1)
                .queryString("hintKeywords", hintKeywords)
                .asString();
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();

        return objectMapper
            .readValue(responseBody, WordResponseDto.class);
    }

    public SearchFlowDto getDataTrend(String mainWord, String[] keywords, String clientId,
        String clientSecret) throws JsonProcessingException {
        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("X-Naver-Client-Id", clientId);
        requestHeaders.put("X-Naver-Client-Secret", clientSecret);
        requestHeaders.put("Content-Type", "application/json");
//        String requestBody =
        JsonObject requestBody = new JsonObject();
        requestBody.addProperty("startDate", "2021-01-01");
        requestBody.addProperty("endDate", "2021-09-28");
        requestBody.addProperty("timeUnit", "month");
        JsonArray keywordList = new JsonArray();
        for (String word : keywords) {
            keywordList.add(word);
            System.out.print(word + " ");
        }
        JsonObject keywordGroup = new JsonObject();
        keywordGroup.addProperty("groupName", mainWord);
        keywordGroup.add("keywords", keywordList);
        JsonArray keywordGroups = new JsonArray();
        keywordGroups.add(keywordGroup);
        requestBody.add("keywordGroups", keywordGroups);
        String request = requestBody.toString();
        String responseBody = DataLabHttp.post(DataLabPath, requestHeaders, request);
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(responseBody, SearchFlowDto.class);
    }

}
