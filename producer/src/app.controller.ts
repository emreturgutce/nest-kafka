import { Controller, Get } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: [process.env.KAFKA_BROKER_URL],
      },
      consumer: {
        groupId: 'consumer-group',
      },
    },
  })
  client: ClientKafka;

  constructor(private readonly appService: AppService) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf(process.env.TOPIC_NAME);
    await this.client.connect();
  }

  @Get()
  getHello() {
    return this.client.send(process.env.TOPIC_NAME, 'Hello Kafka');
  }
}
