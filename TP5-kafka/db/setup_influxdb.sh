influx -execute "CREATE DATABASE tpkafka;"
influx -execute "CREATE RETENTION POLICY one_month ON tpkafka DURATION 30d REPLICATION 1 DEFAULT;"