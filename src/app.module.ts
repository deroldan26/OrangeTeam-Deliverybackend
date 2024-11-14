import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseProvider } from './core/infrastructure/database/postgresSQL/postgresProvider';
import { ProductController } from './product/infrastructure/controller/product.controller';
import { ComboController } from './combo/infraestructure/controller/combo.controller';
import { CategoryController } from './category/infraestructure/controller/category.controller';

@Module({
  imports: [
    ConfigModule.forRoot({})
  ],
  controllers: [ProductController, ComboController, CategoryController],
  providers: [...DatabaseProvider],
})
export class AppModule {}
