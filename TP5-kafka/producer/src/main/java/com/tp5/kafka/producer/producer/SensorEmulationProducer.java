package com.tp5.kafka.producer.producer;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import com.tp5.kafka.producer.dto.SensorPayload;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SensorEmulationProducer {

    private final KafkaTemplate<String, SensorPayload> kafkaTemplate;

    public void sendMessage(SensorPayload sensor) {

        Message<SensorPayload> message = MessageBuilder
                .withPayload(sensor)
                .setHeader(KafkaHeaders.TOPIC, "tp5-kafka-topic")
                .build();

        kafkaTemplate.send(message);
    }

}
