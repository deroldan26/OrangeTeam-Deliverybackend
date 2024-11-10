import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProvider } from './core/infrastructure/database/postgresSQL/postgresProvider';
import { ProductController } from './product/infrastructure/controller/product.controller';

@Module({
  imports: [
    ConfigModule.forRoot({})
  ],
  controllers: [ProductController],
  providers: [...DatabaseProvider],
})
export class AppModule {}
