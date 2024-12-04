import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('OrderProduct')
export class OrderProductEntity {
    @PrimaryGeneratedColumn(
        'uuid'
    )
    entityId: string

    @Column({ 
        type: 'uuid' 
    })
    id: string;

    @Column({ 
        type: 'integer' 
    })
    quantity: number;

    @Column({ 
        type: 'uuid' 
    })
    orderId: string;

    @ManyToOne(() => OrderEntity, 
        order => order.products
    )
    order: OrderEntity;

}