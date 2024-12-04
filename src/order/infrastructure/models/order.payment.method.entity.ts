import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('PaymentMethod')
export class PaymentMethodEntity {
    @PrimaryGeneratedColumn(
        'uuid'
    )
    id: string;

    @Column({ 
        type: 'integer' 
    })
    amount: number;

    @Column({ 
        type: 'varchar' 
    })
    currency: string;

    @Column({ 
        type: 'varchar' 
    })
    paymentMethodName: string;
}