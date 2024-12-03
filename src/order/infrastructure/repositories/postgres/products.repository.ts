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
    
    async findOrderById(id: string): Promise<Result<Product[]>> {
        throw new Error("Method not implemented.");
    }
    async saveOrderProductAggregate(products: Product[]): Promise<Result<Product[]>> {
        try {
            console.log("Guardando productos en BD",products)
            // const newProducts = await Promise.all(products.map(product => this.productMapper.fromDomainToPersistence(product)));
            const newProducts = await Promise.all(products.map(async product => {
                console.log("Mapping product", product);
                const mappedProduct = await this.productMapper.fromDomainToPersistence(product);
                console.log("Mapped product", mappedProduct);
                return mappedProduct;
            }));
            console.log("Saving in repo",newProducts)
            await this.save(newProducts);
            return Result.success<Product[]>(products, 200);
        } catch (error) {
            return Result.fail<Product[]>(new Error(error.message), error.code, error.message);
        }
    }

}