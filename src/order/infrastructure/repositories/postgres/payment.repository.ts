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

    async findPaymentById(id: string): Promise<Result<PaymentMethod>> {
        try {
            var payment = await this.createQueryBuilder('PaymentMethod').select(['PaymentMethod.id','PaymentMethod.amount','PaymentMethod.currency','PaymentMethod.paymentMethodName']).where('PaymentMethod.id = :id',{id}).getOne()
            const getPayment = await this.paymentMapper.fromPersistenceToDomain(payment);
            return Result.success<PaymentMethod>(getPayment, 200)
        } catch (error) {
            return Result.fail<PaymentMethod>(new Error(error.message), error.code, error.message);
        }
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