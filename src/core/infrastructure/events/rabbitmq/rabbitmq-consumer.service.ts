import { Controller, OnModuleInit } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

@Controller()
export class RabbitMQConsumerService<T> implements OnModuleInit {
  onModuleInit() {
    //console.log('RabbitMQ Consumer Service initialized');
  }

  @EventPattern('productCreatedEvent')
  async handleProductCreated(@Payload() data: T, @Ctx() context: RmqContext) {
    // const channel = context.getChannelRef();
    // const originalMsg = context.getMessage();

    // channel.ack(originalMsg);
    //throw new Error('Not implemented');
    console.log('Product created event received:', data);
  }
}