package com.ssafy.starry.controller;

import com.ssafy.starry.controller.dto.twitDto;
import com.ssafy.starry.service.TwitProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/collect", produces = "application/json;charset=UTF-8")
public class TwitterController {

    private final TwitProducer producer;

    @Autowired
    TwitterController(TwitProducer producer) {
        this.producer = producer;
    }

    @PostMapping("/twit")
    public String sendMessage(@RequestBody String text) {
        this.producer.sendTwit(text);
        return "success";
    }

}
