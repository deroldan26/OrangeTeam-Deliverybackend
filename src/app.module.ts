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
import { AuthModule } from './auth/infraestructure/auth.module';
import { AuthController } from './auth/infraestructure/controller/auth.controller';
import { UserController } from './user/infrastructure/controller/user.controller';
import { DiscountController } from './discount/infraestructure/controller/discount.controller';
import { OrderController } from './order/infrastructure/controller/order.controller';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    RabbitmqModule,
    EmailModule,
    AuthModule
  ],

  controllers: [ProductController, ComboController, CategoryController,DiscountController, AuthController, OrderController, UserController, RabbitMQConsumerService],
  providers: [...DatabaseProvider, {
    provide: 'MessagingService',
    useClass: MessagingService,
  }],
})
export class AppModule {}
