package com.tp5.kafka.consumer.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SensorPayload {
    private String sensor;
    private double data;
}
