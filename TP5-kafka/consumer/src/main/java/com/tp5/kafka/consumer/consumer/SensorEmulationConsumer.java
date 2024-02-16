package com.tp5.kafka.consumer.consumer;

import java.util.concurrent.TimeUnit;

import org.influxdb.InfluxDB;
import org.influxdb.InfluxDBFactory;
import org.influxdb.dto.Point;
import org.influxdb.dto.Pong;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.tp5.kafka.consumer.dto.SensorPayload;

@Service
public class SensorEmulationConsumer {
    @Value("${spring.influx.url:default}")
    String databaseURL;
    @Value("${spring.influx.username:default}")
    String username;
    @Value("${spring.influx.password:default}")
    String password;

    Logger log = LoggerFactory.getLogger(KafkaListener.class);
    InfluxDB influxDB;

    @KafkaListener(topics = "tp5-kafka-topic", groupId = "tp5-group")
    public void consumeEvents(SensorPayload sensor) {
        influxDB = InfluxDBFactory.connect(databaseURL, username, password);
        influxDB.setLogLevel(InfluxDB.LogLevel.BASIC);

        Pong response = this.influxDB.ping();
        if (response.getVersion().equalsIgnoreCase("unknown")) {
            log.error("Error pinging server.");
        }

        log.info("consuming sensor event  ** {} **", sensor.toString());
        Point point = Point.measurement("sensors")
                .time(System.currentTimeMillis(), TimeUnit.MILLISECONDS)
                .addField(sensor.getSensor(), sensor.getData())
                .build();

        try {
            influxDB.setDatabase("tpkafka");
            influxDB.write(point);
        } catch (Exception e) {
            log.error("erro inserting in database " + e.getMessage());
        }
        log.info("sensor data written to influxDB");

    }
}
