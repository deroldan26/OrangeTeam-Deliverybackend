import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Discount')
export class DiscountEntity {

    @PrimaryColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    description: string;

    @Column({ type: 'date', nullable: true})
    expireDate: Date | null;

    @Column({ type: 'date', nullable: true})
    initDate: Date | null;

    @Column({ type: 'double precision', name: 'percentage' })
    percentage: number;
}