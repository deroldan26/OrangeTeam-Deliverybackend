import { Result } from '../../../core/domain/result-handler/result';
import { PaymentMethod } from '../entities/paymentMethod';

export interface IPaymentRepository {
  findPaymentById(id: string): Promise<Result<PaymentMethod>>;
  savePaymentEntity(payment: PaymentMethod): Promise<Result<PaymentMethod>>;
}