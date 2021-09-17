package com.ssafy.starry.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class TwitProducer {

    private static final String TOPIC = "input";
    private final KafkaTemplate<String, String> KafkaTemplate;

    @Autowired
    public TwitProducer(
        @Qualifier("stringTemplate") KafkaTemplate<String, String> kafkaTemplate) {
        this.KafkaTemplate = kafkaTemplate;
    }

    public void sendTwit(String input) {
        System.out.printf("Produce str : %s%n", input);
        this.KafkaTemplate.send(TOPIC, input);
    }
}
