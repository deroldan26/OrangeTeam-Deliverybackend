import { DataSource, Repository } from "typeorm";
import { PaymentMethodEntity as PaymentORM } from "../../models/order.payment.method.entity";
import { Result } from "src/core/domain/result-handler/result";
import { PaymentMethod } from "src/order/domain/entities/paymentMethod";
import { IPaymentRepository } from "src/order/domain/repositories/payment-repositories.interface";
import { PaymentMapper } from "../../mapper/payment.mapper";

export class PaymentMethodPostgresRepository extends Repository<PaymentORM> implements IPaymentRepository{
    private readonly paymentMapper: PaymentMapper;

    constructor(dataSource: DataSource){
        super(PaymentORM, dataSource.createEntityManager());
        this.paymentMapper = new PaymentMapper();
    }

    findPaymentById(id: string): Promise<Result<PaymentMethod>> {
        try {
            
        } catch (error) {
            //return Result.fail<Order>(new Error(error.message), error.code, error.message);
        }
        throw new Error("Method not implemented.");
    }

    async savePaymentEntity(payment: PaymentMethod): Promise<Result<PaymentMethod>> {
        try {
            const newPayment = await this.paymentMapper.fromDomainToPersistence(payment);
            await this.save(newPayment);
            return Result.success<PaymentMethod>(payment, 200);
        } catch (error) {
            return Result.fail<PaymentMethod>(new Error(error.message), error.code, error.message);
        }
    }

}