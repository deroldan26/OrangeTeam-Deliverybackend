import { Result } from "src/core/domain/result-handler/result";
import { DataSource, Repository } from "typeorm";
import { OrderProductEntity as ProductORM } from "../../models/order.products.entity";
import { IOrderProductsRepository } from "src/order/domain/repositories/order-products-repositories.interface";
import { Product } from "src/order/domain/entities/product";
import { OrderProductMapper } from "../../mapper/order.products.mapper";

export class OrderProductPostgresRepository extends Repository<ProductORM> implements IOrderProductsRepository{
    
    private readonly productMapper: OrderProductMapper;

    constructor(dataSource: DataSource){
        super(ProductORM, dataSource.createEntityManager());
        this.productMapper = new OrderProductMapper();
    }
    
    async findOrderProductById(id: string): Promise<Result<Product[]>> {
        try {
            var orderProducts = await this.createQueryBuilder('OrderProduct')
                .select(['OrderProduct.id','OrderProduct.quantity','OrderProduct.orderId'])
                .where('OrderProduct.orderId = :id',{id})
                .getMany()
            const products: Product[] = [];
            for (const orderProduct of orderProducts) {
                const product = await this.productMapper.fromPersistenceToDomain(orderProduct);
                products.push(product);
            }
            return Result.success<Product[]>(products, 200)
        } catch (error) {
            return Result.fail<Product[]>(new Error(error.message), error.code, error.message);
        }
    }
    async saveOrderProductEntity(products: Product[]): Promise<Result<Product[]>> {
        try {
            const newProducts = await Promise.all(products.map(async product => {
                const mappedProduct = await this.productMapper.fromDomainToPersistence(product);
                return mappedProduct;
            }));
            await this.save(newProducts);
            return Result.success<Product[]>(products, 200);
        } catch (error) {
            return Result.fail<Product[]>(new Error(error.message), error.code, error.message);
        }
    }

}