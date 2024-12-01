import { Combo } from "src/order/domain/entities/combo";
import { Product } from "src/order/domain/entities/product";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { PaymentMethodEntity } from "./order.payment.method.entity";
import { OrderReportEntity } from "./order.report.entity";

@Entity('Order')
export class OrderEntity{
    @PrimaryColumn(
        'uuid',
    )
    orderId: string

    @Column({
        type: 'date',
    })
    createdDate: Date

    @Column({
        type: 'varchar'
    })
    status: string

    @Column({
        type: 'varchar'
    })
    address: string

    @Column({
        type: 'varchar'
    })
    products: Product[]

    @Column({
        type: 'varchar'
    })
    combos: Combo[]

    @OneToOne(() => PaymentMethodEntity, {eager: true})
    @JoinColumn({
        name: 'paymenMethodId'
    })
    paymentMethod?: PaymentMethodEntity

    @OneToOne(() => OrderReportEntity, {eager: true})
    @JoinColumn({
        name: 'reportId'
    })
    report?: OrderReportEntity

    @Column({
        type: 'date',
    })
    receivedDate?: Date
}