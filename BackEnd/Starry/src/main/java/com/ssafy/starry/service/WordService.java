package com.ssafy.starry.service;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.HttpResponse;
import com.ssafy.starry.common.utils.PropertiesLoader;
import com.ssafy.starry.common.utils.RestClient;
import com.ssafy.starry.controller.dto.WordResponseDto;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WordService {

    static String RelKwdPath = "/keywordstool";

    public WordResponseDto getWordAnalysis(String word) {
        WordResponseDto words = null;
        try {
            Properties properties = PropertiesLoader.fromResource("secret.properties");
            String baseUrl = properties.getProperty("BASE_URL");
            String apiKey = properties.getProperty("API_KEY");
            String secretKey = properties.getProperty("SECRET_KEY");
            System.out.println("URL : " + baseUrl);
            System.out.println("apiKey : " + apiKey);
            System.out.println("secretKey : " + secretKey);
            long customerId = Long.parseLong(properties.getProperty("CUSTOMER_ID"));
            RestClient rest = RestClient.of(baseUrl, apiKey, secretKey);

            words = list(rest, customerId, word);
            System.out.println(words.toString());

        } catch (Exception e) {
            e.printStackTrace();
        }
        return words;
    }

    public WordResponseDto list(RestClient rest, long customerId, String hintKeywords)
        throws Exception {
        HttpResponse<String> response =
            rest.get(RelKwdPath, customerId)
                .queryString("showDetail", 1)
                .queryString("hintKeywords", hintKeywords)
                .asString();
        String responseBody = response.getBody();
        System.out.println("responseBody" + responseBody);
        ObjectMapper objectMapper = new ObjectMapper();
//        Map<String, Object> list = objectMapper
//            .readValue(responseBody, new TypeReference<Map<String, Object>>() {
//            });

        return objectMapper
            .readValue(responseBody, WordResponseDto.class);
    }

}
