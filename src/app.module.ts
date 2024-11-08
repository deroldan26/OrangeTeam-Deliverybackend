import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/infrastructure/controller/product.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProvider } from './core/infrastructure/database/postgresSQL/postgresProvider';

@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({})
  ],
  controllers: [AppController],
  providers: [AppService, ...DatabaseProvider],
})
export class AppModule {}
