import { getProductByIdService } from "../../src/product/application/queries/get-productById.service"
import { IProductRepository } from "../../src/product/domain/repositories/product-repositories.interface";
import { ProductRepositoryMock } from "../common/repository-mocks/product.repository.mock";
import { GetProductByIdServiceEntryDto } from "../../src/product/application/dtos/entry/get-productById-entry.service.dto";
import { GetProductByIdServiceResponseDto } from "../../src/product/application/dtos/response/get-product-response.service.dto";
import { IImageHandler } from "../../src/core/application/image.handler/image.handler";
import { ImageHandlerMock } from "../common/other-mocks/image.handler.mock";
import { ProductMock } from "../common/objects-mocks/product.mock";


describe('getOrderByIdService', () => {

    it('should return a product by id', async () => {
        const repository = ProductRepositoryMock.create();
        const product = await ProductMock.getProductMock();
 
        await repository.saveProductAggregate(product);

        const imageHandlerMock = ImageHandlerMock.create();
        const service = new getProductByIdService(repository, imageHandlerMock);

        const data: GetProductByIdServiceEntryDto = {
            id: product.Id.Id
        };

        const response = await service.execute(data);

        expect(response.isSuccess()).toBeTruthy();
    });

    it('should return an error, the product does not exists', async () => {
        const repository = ProductRepositoryMock.create();
        const product = await ProductMock.getProductMock();

        const imageHandlerMock = ImageHandlerMock.create();
        const service = new getProductByIdService(repository, imageHandlerMock);

        const data: GetProductByIdServiceEntryDto = {
            id: product.Id.Id
        };

        const response = await service.execute(data);

        expect(response.isSuccess()).toBeFalsy();
    });

});