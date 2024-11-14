import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProvider } from './core/infrastructure/database/postgresSQL/postgresProvider';
import { ProductController } from './product/infrastructure/controller/product.controller';
import { ComboController } from './combo/infraestructure/controller/combo.controller';
import { RabbitmqModule } from './core/infrastructure/events/rabbitmq/rabbitmq.module';
import { MessagingService } from './core/infrastructure/events/rabbitmq/messaging.service';
import { RabbitMQConsumerService } from './core/infrastructure/events/rabbitmq/rabbitmq-consumer.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    RabbitmqModule
  ],
  controllers: [ProductController, ComboController, RabbitMQConsumerService],
  providers: [...DatabaseProvider, {
    provide: 'MessagingService',
    useClass: MessagingService,
  }],
})
export class AppModule {}
