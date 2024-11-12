import { IProductRepository } from "../../../product/domain/repositories/product-repositories.interface";
import { ProductID } from "../../../product/domain/value-objects/product.id";
import { Result } from "../../../core/domain/result-handler/result";

export class ProductValidatorService {
    constructor(private readonly productRepository: IProductRepository) {}

    async validateProductIds(productIds: string[]): Promise<Result<ProductID[]>> {
        const validatedProductIds: ProductID[] = [];
        for (const id of productIds) {
            const productId = new ProductID(id);
            const result = await this.productRepository.findProductById(productId.Id);

            if (!result.isSuccess()) {
                return Result.fail<ProductID[]>(
                    new Error(`Product with ID ${id} does not exist`),
                    400,
                    `Invalid product ID: ${id}`
                );
            }
            validatedProductIds.push(productId);
        }
        return Result.success(validatedProductIds, 200);
    }
}
