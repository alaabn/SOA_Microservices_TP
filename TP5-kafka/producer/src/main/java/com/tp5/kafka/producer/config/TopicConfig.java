package com.tp5.kafka.producer.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class TopicConfig {

    @Bean
    public NewTopic Tp5KafkaTopic() {
        return TopicBuilder
                .name("tp5-kafka-topic")
                .build();
    }
}