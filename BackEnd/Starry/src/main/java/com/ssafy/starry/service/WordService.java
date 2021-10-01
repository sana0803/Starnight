package com.ssafy.starry.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mashape.unirest.http.HttpResponse;
import com.ssafy.starry.common.utils.DataLabHttp;
import com.ssafy.starry.common.utils.PropertiesLoader;
import com.ssafy.starry.common.utils.RestClient;
import com.ssafy.starry.controller.dto.SearchDto;
import com.ssafy.starry.controller.dto.SearchFlowDto;
import com.ssafy.starry.controller.dto.WordDto;
import com.ssafy.starry.controller.dto.WordDto.WordApiResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class WordService {

    static String RelKwdPath = "/keywordstool";
    static String DataLabPath = "https://openapi.naver.com/v1/datalab/search";

    public SearchDto getWordAnalysis(String word) {
        SearchDto searchDto = null;
        WordDto words = null;
        try {
            Properties properties = PropertiesLoader.fromResource("secret.properties");
            String baseUrl = properties.getProperty("BASE_URL");
            String apiKey = properties.getProperty("API_KEY");
            String secretKey = properties.getProperty("SECRET_KEY");
            String clientId = properties.getProperty("CLIENT_ID");
            String clientSecret = properties.getProperty("CLIENTSECRET");
            long customerId = Long.parseLong(properties.getProperty("CUSTOMER_ID"));
            RestClient rest = RestClient.of(baseUrl, apiKey, secretKey);

            words = list(rest, customerId, word);

            log.info("네이버 API에서 돌려받은 WordDto : " + words.toString());
            if (words.getKeywordList().size() > 20) {
                words.setKeywordList(words.getKeywordList().subList(0, 20));
            }
            List<String> keywords = new ArrayList<>();
            for (WordApiResponse w : words.getKeywordList()) {
                keywords.add(w.getRelKeyword());
            }
            SearchFlowDto searchFlowDto = getDataTrend(word, keywords.toArray(new String[0]),
                clientId,
                clientSecret);
            log.info("검색량 추이에 대한 데이터 API Return " + searchFlowDto);
            searchDto = new SearchDto(words, searchFlowDto);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return searchDto;
    }

    public WordDto list(RestClient rest, long customerId, String hintKeywords)
        throws Exception {
        HttpResponse<String> response =
            rest.get(RelKwdPath, customerId)
                .queryString("showDetail", 1)
                .queryString("hintKeywords", hintKeywords)
                .asString();
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();

        return objectMapper
            .readValue(responseBody, WordDto.class);
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
