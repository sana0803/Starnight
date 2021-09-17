package com.ssafy.starry.controller;

import com.ssafy.starry.service.TwitProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/twit", produces = "application/json;charset=UTF-8")
public class TwitterController {

    private final TwitProducer producer;

    @Autowired
    TwitterController(TwitProducer producer) {
        this.producer = producer;
    }

    @PostMapping("/lunch")
    public String sendMessage(@RequestBody String text) {
        System.out
            .println("TwitterController message" + text);
        this.producer.sendTwit(text);
        return "success";
    }

}