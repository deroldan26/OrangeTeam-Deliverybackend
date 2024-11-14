import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProvider } from './core/infrastructure/database/postgresSQL/postgresProvider';
import { ProductController } from './product/infrastructure/controller/product.controller';
import { ComboController } from './combo/infraestructure/controller/combo.controller';
import { CategoryController } from './category/infraestructure/controller/category.controller';
import { MessagingService } from './core/application/events/messaging.service';
import { RabbitmqModule } from './core/infrastructure/events/rabbitmq/rabbitmq.module';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    RabbitmqModule
  ],
  controllers: [ProductController, ComboController, CategoryController],
  providers: [...DatabaseProvider,{
    provide: 'MessagingService',
    useClass: MessagingService,
  }],
})
export class AppModule {}
