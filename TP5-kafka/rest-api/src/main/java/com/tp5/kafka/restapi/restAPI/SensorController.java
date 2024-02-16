package com.tp5.kafka.restapi.restAPI;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.influxdb.InfluxDB;
import org.influxdb.InfluxDBFactory;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/sensordata")
@RequiredArgsConstructor
public class SensorController {
    @Value("${spring.influx.database:default}")
    private String databaseURL;
    @Value("${spring.influx.username:default}")
    private String userName;
    @Value("${spring.influx.password:default}")
    private String password;

    InfluxDB influxDB;

    @GetMapping()
    public ResponseEntity<List<QueryResult.Result>> sendMessage() {
        influxDB = InfluxDBFactory.connect(databaseURL, userName, password);

        influxDB.setDatabase("tpkafka");
        QueryResult queryResult = influxDB.query(new Query("SELECT * FROM sensors"), TimeUnit.MILLISECONDS);

        return ResponseEntity.ok(queryResult.getResults());
    }
}
