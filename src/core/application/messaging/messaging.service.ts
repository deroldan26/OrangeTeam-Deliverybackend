import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SendMessage } from '../../domain/sendmessage/send-message.interface';


@Injectable()
export class MessagingService<T> implements SendMessage<T> {
  constructor(@Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy) {}

  async sendMessage(patron: string, data: T) {
    return this.client.emit(patron, data);
  }
}