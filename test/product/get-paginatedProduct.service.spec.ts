import { GetPaginatedProductService } from "../../src/product/application/queries/get-paginatedProduct.service";
import { IProductRepository } from "../../src/product/domain/repositories/product-repositories.interface";
import { ProductRepositoryMock } from "../../test/common/repository-mocks/product.repository.mock";
import { GetPaginatedProductServiceEntryDto } from "../../src/product/application/dtos/entry/get-paginated-product-entry.service";
import { IImageHandler } from "../../src/core/application/image.handler/image.handler";
import { ImageHandlerMock } from "../../test/common/other-mocks/image.handler.mock";
import { ProductMock } from "../../test/common/objects-mocks/product.mock";


describe('GetPaginatedProductService', () => {

    it('should return a list of products', async () => {
        const repository = ProductRepositoryMock.create();
        const product = await ProductMock.getProductMock();
 
        await repository.saveProductAggregate(product);

        const imageHandlerMock = ImageHandlerMock.create();
        const service = new GetPaginatedProductService(repository, imageHandlerMock);

        const data: GetPaginatedProductServiceEntryDto = {
            page: 1,
            perpage: 10
        }

        const response = await service.execute(data);

        expect(response.isSuccess()).toBeTruthy();
    });

    it('should return an empty list, there are no products saved', async () => {
        const repository = ProductRepositoryMock.create();
        const product = await ProductMock.getProductMock();

        const imageHandlerMock = ImageHandlerMock.create();
        const service = new GetPaginatedProductService(repository, imageHandlerMock);

        const data: GetPaginatedProductServiceEntryDto = {
            page: 1,
            perpage: 10
        }

        const response = await service.execute(data);

        expect(response.Value.products.length).toBe(0);
    });

});