import { Product as ProductORM } from 'src/product/infrastructure/models/postgres/product.entity';
import { DataSource, Repository } from "typeorm";

export class ProductPostgresRepository extends Repository<ProductORM>{
    constructor(dataSource: DataSource) {
      super(ProductORM, dataSource.createEntityManager());
    }
}