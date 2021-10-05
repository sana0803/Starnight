package com.ssafy.starry.service;

import com.ssafy.starry.util.RedisUtil;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class TwitProducer {

    private static final String TOPIC = "twit";
    private final KafkaTemplate<String, String> KafkaTemplate;
    private final RedisUtil redisUtil;

    @Autowired
    public TwitProducer(
        @Qualifier("stringTemplate") KafkaTemplate<String, String> kafkaTemplate,
        RedisUtil redisUtil) {
        this.KafkaTemplate = kafkaTemplate;
        this.redisUtil = redisUtil;
    }

    public void sendTwit(String input) {
        Set<Object> words = redisUtil.get("searchWords");
        for (Object w : words) {
            String word = (String) w;
            System.out.println(word);
        }
        this.KafkaTemplate.send(TOPIC, input);
    }
}
