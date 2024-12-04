import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('OrderReport')
export class OrderReportEntity {
    @PrimaryGeneratedColumn(
        'uuid'
    )
    id: string;

    @Column({
        type: 'date',
    })
    reportDate: Date

    @Column({
        type: 'varchar',
    })
    description: string
    
}
