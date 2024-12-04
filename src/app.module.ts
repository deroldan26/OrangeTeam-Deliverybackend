import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProvider } from './core/infrastructure/database/postgresSQL/postgresProvider';
import { ProductController } from './product/infrastructure/controller/product.controller';
import { ComboController } from './combo/infraestructure/controller/combo.controller';
import { CategoryController } from './category/infraestructure/controller/category.controller';
import { RabbitmqModule } from './core/infrastructure/events/rabbitmq/rabbitmq.module';
import { MessagingService } from './core/infrastructure/events/rabbitmq/messaging.service';
import { RabbitMQConsumerService } from './core/infrastructure/events/rabbitmq/rabbitmq-consumer.service';
import { EmailModule } from './core/infrastructure/emailsender/email.module';
import { OrderController } from './order/infrastructure/controller/order.controller';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    RabbitmqModule,
    EmailModule
  ],
  controllers: [ProductController, ComboController, CategoryController, OrderController, RabbitMQConsumerService],
  providers: [...DatabaseProvider, {
    provide: 'MessagingService',
    useClass: MessagingService,
  }],
})
export class AppModule {}
