package com.tp5.kafka.producer.hook;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tp5.kafka.producer.dto.SensorPayload;
import com.tp5.kafka.producer.producer.SensorEmulationProducer;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/sensordata")
@RequiredArgsConstructor
public class RestAPISensorListner {
    private final SensorEmulationProducer kafkaProducer;

    @PostMapping
    public ResponseEntity<String> sendMessage(
            @RequestBody SensorPayload message) {
        kafkaProducer.sendMessage(message);
        return ResponseEntity.ok("Message queued successfully  \n" + message);
    }
}
