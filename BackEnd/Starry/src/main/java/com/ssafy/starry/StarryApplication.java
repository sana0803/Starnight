package com.ssafy.starry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class StarryApplication {

    public static void main(String[] args) {
        System.setProperty("spring.profiles.default", "prod");
        SpringApplication.run(StarryApplication.class, args);
    }

}
