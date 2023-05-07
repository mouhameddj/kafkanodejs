const { KafkaClient, Producer } = require('kafka-node');
require('dotenv').config();

const client = new KafkaClient({
  kafkaHost: `${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`
});

const producer = new Producer(client);

producer.on('ready', () => {
  console.log('Producteur prêt');

  setInterval(() => {
    const message = new Date().toLocaleString();
    const payloads = [{ topic: process.env.KAFKA_TOPIC, messages: message }];
    producer.send(payloads, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Message envoyé : ${message}`);
      }
    });
  }, 1000);
});

producer.on('error', (err) => {
  console.error(err);
});