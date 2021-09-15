package com.ssafy.starry.controller;

import com.ssafy.starry.controller.dto.testDto;
import com.ssafy.starry.service.KafkaProducer;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/kafka")
public class KafkaController {

    private final KafkaProducer producer;

    @Autowired
    KafkaController(KafkaProducer producer) {
        this.producer = producer;
    }

    @PostMapping
    public String sendMessage(@RequestBody testDto testdto) {
        System.out
            .printf("requestbody key1 : %s%n key2 : %s%n", testdto.getKey1(), testdto.getKey2());
        this.producer.sendMessage(testdto);
        return "success";
    }
}