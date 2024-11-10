import { DataSource, getMetadataArgsStorage } from "typeorm";
import { ProductPostgresRepository } from "../../../../product/infrastructure/repositories/postgres/product.repository";

export const DatabaseProvider = [
    {
      provide: 'DataSource',
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: +process.env.DATABASE_PORT,
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PSWD,
          database: process.env.DATABASE_NAME,
          entities: getMetadataArgsStorage().tables.map((table) => table.target),
          ssl: {
            rejectUnauthorized: false,
          },
          synchronize: true,
        });
  
        try {
          if (!dataSource.isInitialized) {
            await dataSource.initialize();
          }
        } catch (error) {
          console.error(error?.message);
        }
  
        return dataSource;
      },
    },
    {
      provide: 'ProductRepository',
      useFactory: (dataSource: DataSource) => {
        return new ProductPostgresRepository(dataSource);
      },
      inject: ['DataSource'],
    }
  ]