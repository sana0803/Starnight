package com.ssafy.starry.config;

import com.ssafy.starry.util.RedisUtil;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Properties;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.Topology;
import org.apache.kafka.streams.kstream.Consumed;
import org.apache.kafka.streams.kstream.Grouped;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.KTable;
import org.apache.kafka.streams.kstream.Produced;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StreamInitializingBean implements InitializingBean, DisposableBean {

    final Serde<String> stringSerde = Serdes.String();
    final Serde<Long> longSerde = Serdes.Long();
    @Autowired
    RedisUtil redisUtil;
    protected KafkaStreams kafkaStreams;

    @Override
    public void afterPropertiesSet() throws Exception {
        StreamsBuilder streamsBuilder = new StreamsBuilder();
        KStream<String, String> textLines = streamsBuilder
            .stream("twit", Consumed.with(Serdes.String(), Serdes.String()));

        Set<String> searchWords = redisUtil.get("searchWords").stream().map(object -> Objects
            .toString(object, null)).collect(Collectors.toSet());
        for (String word : searchWords) {
            System.out.println(word);
        }

        KTable<String, Long> wordCounts = textLines
            .flatMapValues(value -> {
                List<String> words = new ArrayList<>();
                int vLen = value.length();
                boolean[] used = new boolean[vLen];
                for (int i = 7; i >= 1; i--) {
                    if (vLen < i) {
                        continue;
                    }
                    for (int j = 0; j < vLen - i + 1; j++) {
                        String s = value.substring(j, j + i);
                        if (!used[j] && searchWords.contains(s)) {
                            words.add(s);
                            for (int k = j; k <= j + 1; k++) {
                                used[k] = true;
                            }
                        }
                    }
                }
                return words;
            })
            .groupBy((key, word) -> word, Grouped.with(Serdes.String(), Serdes.String()))
            .count();

        wordCounts.toStream()
            .foreach((w, c) -> System.out.println("word: " + w + " -> " + c));

        Topology topology = streamsBuilder.build();
        this.kafkaStreams = new KafkaStreams(topology, getStreamConfig());
        kafkaStreams.start();
    }

    @Override
    public void destroy() throws Exception {
        this.kafkaStreams.close();
    }

    private Properties getStreamConfig() {
//        Map<String, Object> props = new HashMap<>();
        Properties streamsConfiguration = new Properties();
        streamsConfiguration.put(StreamsConfig.APPLICATION_ID_CONFIG, "twit-lunch-count");
        streamsConfiguration.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, "3.35.214.129:9092");
        streamsConfiguration.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG,
            Serdes.String().getClass().getName());
        streamsConfiguration.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG,
            Serdes.String().getClass().getName());
        return streamsConfiguration;
    }
}
