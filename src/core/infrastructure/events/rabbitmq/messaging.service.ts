import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SendMessage } from '../../../domain/send-message';

@Injectable()
export class MessagingService<T> implements SendMessage<T> {
  constructor(@Inject('RABBITMQ_SERVICE') 
              private readonly client: ClientProxy) {}

  async sendMessage(pattern: string, data: T) {
    console.log(`Sending message to RabbitMQ with pattern: ${pattern}`);
    return this.client.emit(pattern, data);
  }
}