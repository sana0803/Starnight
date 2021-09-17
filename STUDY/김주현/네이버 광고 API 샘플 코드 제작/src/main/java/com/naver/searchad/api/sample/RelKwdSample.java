package com.naver.searchad.api.sample;

import com.naver.searchad.api.model.RelKwdStat;
import com.naver.searchad.api.model.estimate.BulkItem;
import com.naver.searchad.api.model.estimate.Device;
import com.naver.searchad.api.model.estimate.IDType;
import com.naver.searchad.api.model.estimate.KeyAndPosition;
import com.naver.searchad.api.model.estimate.PeriodType;
import com.naver.searchad.api.model.estimate.RequestAveragePositionBid;
import com.naver.searchad.api.model.estimate.RequestBidByStatisticsDistribution;
import com.naver.searchad.api.model.estimate.RequestPerformance;
import com.naver.searchad.api.model.estimate.RequestPerformanceBulk;
import com.naver.searchad.api.model.estimate.ResponseAveragePositionBid;
import com.naver.searchad.api.model.estimate.ResponseBidByStatisticsDistribution;
import com.naver.searchad.api.model.estimate.ResponsePerformance;
import com.naver.searchad.api.model.estimate.ResponsePerformanceBulk;
import com.naver.searchad.api.rest.Estimate;
import com.naver.searchad.api.rest.RelKwdStats;
import com.naver.searchad.api.util.PropertiesLoader;
import com.naver.searchad.api.util.RestClient;
import java.util.Collections;
import java.util.Properties;

public class RelKwdSample {

    public static void main(String[] args) {
        try {
            Properties properties = PropertiesLoader.fromResource("sample.properties");
            String baseUrl = properties.getProperty("BASE_URL");
            String apiKey = properties.getProperty("API_KEY");
            String secretKey = properties.getProperty("SECRET_KEY");
            long customerId = Long.parseLong(properties.getProperty("CUSTOMER_ID"));
            RestClient rest = RestClient.of(baseUrl, apiKey, secretKey);

            RelKwdStat relKwdStat = RelKwdStats.list(rest, customerId, "소고기");
            System.out.println(relKwdStat.toString());


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
