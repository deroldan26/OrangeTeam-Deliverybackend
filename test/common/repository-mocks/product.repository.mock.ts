import { Result } from "../../../src/core/domain/result-handler/result";
import { IProductRepository } from "../../../src/product/domain/repositories/product-repositories.interface";
import { Product } from "../../../src/product/domain/product";
import { ProductID } from "../../../src/product/domain/value-objects/product.id";

export class ProductRepositoryMock implements IProductRepository {

    private readonly products: Product[] = [];

    async findProductById(id: string): Promise<Result<Product>> {
        try{
            for (let i = 0; i < this.products.length; i++) {
                const product = this.products[i];
                if (product.Id.Id == id) {
                    return Result.success<Product>(product, 200)
                }
            }
            throw new Error(`Product with ID ${id} not found`);
        }catch(error){
            return Result.fail<Product>(new Error(error.message), error.code, error.message);
        }
    }

    async findPaginatedProducts(page: number, take: number, name?: string, category?: string): Promise<Result<Product[]>> {
        return Result.success<Product[]>(this.products, 200);
    }

    async saveProductAggregate(product: Product): Promise<Result<Product>> {
        this.products.push(product);
        return Result.success<Product>(product, 200);
    }

    static create(){
        return new ProductRepositoryMock();
    }
}