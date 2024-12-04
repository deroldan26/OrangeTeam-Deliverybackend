import { Combo } from "src/order/domain/entities/combo";
import { Product } from "src/order/domain/entities/product";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { PaymentMethodEntity } from "./order.payment.method.entity";
import { OrderReportEntity } from "./order.report.entity";
import { OrderComboEntity } from "./order.combos.entity";
import { OrderProductEntity } from "./order.products.entity";

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

    @OneToMany(() => OrderProductEntity, 
        product => product.order, 
        { eager: true }
    )
    products: OrderProductEntity[]

    @OneToMany(() => OrderComboEntity, 
        combo => combo.order, 
        {eager: true}
    )
    combos: OrderComboEntity[]

    @OneToOne(() => PaymentMethodEntity, {eager: true})
    @JoinColumn({
        name: 'paymentMethodId'
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