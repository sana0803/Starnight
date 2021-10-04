package com.ssafy.starry.util;

import java.util.Collections;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisUtil {

    private final RedisTemplate<String, Object> redisTemplate;


    public void addSet(String key, Object o) {
        redisTemplate.opsForSet().add(key, o);
    }

    public Set<Object> get(String key) {
        return redisTemplate.opsForSet().intersect(Collections.singleton(key));
    }

    public boolean delete(String key) {
        return redisTemplate.delete(key);
    }

    public boolean hasKey(String key) {
        return redisTemplate.hasKey(key);
    }
}
