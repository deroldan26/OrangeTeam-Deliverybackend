import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { MessagingService } from './messaging.service';
import { RabbitMQConsumerService } from './rabbitmq-consumer.service';
import { EmailService } from '../../emailsender/email.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')],
            queue: configService.get<string>('RABBITMQ_QUEUE'),
            queueOptions: {
              durable: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [ClientsModule, MessagingService],
  providers: [MessagingService, EmailService],
  controllers: [RabbitMQConsumerService],
})
export class RabbitmqModule {}