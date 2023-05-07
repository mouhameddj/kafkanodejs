const { KafkaClient, Consumer } = require('kafka-node');
require('dotenv').config();

const client = new KafkaClient({
  kafkaHost: `${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`
});

const consumer = new Consumer(
  client,
  [{ topic: process.env.KAFKA_TOPIC, partition: 0 }],
  { autoCommit: true }
);

consumer.on('message', (message) => {
  console.log(`Message reçu : ${message.value}`);
});

consumer.on('error', (err) => {
  console.error(err);
});