import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(process.env.TOPIC_NAME)
  getHello(@Payload() message: any) {
    console.log(message);
    return 'Hello world';
  }
}
