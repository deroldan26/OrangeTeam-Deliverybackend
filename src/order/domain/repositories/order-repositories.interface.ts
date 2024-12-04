import { Result } from '../../../core/domain/result-handler/result';
import { Order } from '../order';

export interface IOrderRepository {
  findOrderById(id: string): Promise<Result<Order>>;
  saveOrderAggregate(order: Order): Promise<Result<Order>>;
  findPaginatedOrders(page: number, take: number, status?: string): Promise<Result<Order[]>>
}