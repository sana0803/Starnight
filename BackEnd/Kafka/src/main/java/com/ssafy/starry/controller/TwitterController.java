package com.ssafy.starry.controller;

import com.ssafy.starry.service.TwitProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/twit")
public class TwitterController {

    private final TwitProducer producer;

    @Autowired
    TwitterController(TwitProducer producer) {
        this.producer = producer;
    }

    @PostMapping
    public String sendMessage(@RequestParam("message") String message) {
        System.out
            .println("requestbody message" + message);
        this.producer.sendTwit(message);
        return "success";
    }

}
