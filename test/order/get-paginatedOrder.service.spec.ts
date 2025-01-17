import { GetPaginatedOrderService } from "../../src/order/application/queries/get-paginatedOrder.service";
import { IOrderRepository } from "src/order/domain/repositories/order-repositories.interface";
import { OrderRepositoryMock } from "../../test/common/repository-mocks/order.repository.mock";
import { GetPaginatedOrderServiceEntryDto } from "../../src/order/application/dtos/entry/get-paginated-order-entry.service";
import { IImageHandler } from "../../src/core/application/image.handler/image.handler";
import { ImageHandlerMock } from "../common/other-mocks/image.handler.mock";
import { OrderMock } from "../../test/common/objects-mocks/order.mock";
import { UserMock } from "../../test/common/objects-mocks/user.mock";
import { OrderComboRepositoryMock } from "../../test/common/repository-mocks/order-combo.repository.mock";
import { OrderProductRepositoryMock } from "../../test/common/repository-mocks/order-product.repository.mock";


describe('GetPaginatedOrderService', () => {

    it('should return all the orders associated to a user', async () => {
        const orderRepository = OrderRepositoryMock.create();
        const orderComboRepository = OrderComboRepositoryMock.create();
        const orderProductRepository = OrderProductRepositoryMock.create();
        const user = await UserMock.getUserMock();

        const order = await OrderMock.getOrderMock(user.Id.Id, user.Email.Email);
 
        await orderRepository.saveOrderAggregate(order);

        const service = new GetPaginatedOrderService(orderRepository, orderProductRepository, orderComboRepository);

        const data: GetPaginatedOrderServiceEntryDto = {
            page: 1,
            take: 10,
            user: user.Id.Id
        }

        const response = await service.execute(data);

        expect(response.isSuccess()).toBeTruthy();
    });

    it('should return an empty array, the user has no orders', async () => {
        const orderRepository = OrderRepositoryMock.create();
        const orderComboRepository = OrderComboRepositoryMock.create();
        const orderProductRepository = OrderProductRepositoryMock.create();
        const user = await UserMock.getUserMock();

        const order = await OrderMock.getOrderMock(user.Id.Id, user.Email.Email);

        const service = new GetPaginatedOrderService(orderRepository, orderProductRepository, orderComboRepository);

        const data: GetPaginatedOrderServiceEntryDto = {
            page: 1,
            take: 10,
            user: user.Id.Id
        }

        const response = await service.execute(data);

        expect(response.Value.orders.length).toBe(0);
    });

});