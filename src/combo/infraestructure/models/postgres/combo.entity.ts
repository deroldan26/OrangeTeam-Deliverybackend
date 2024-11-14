import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Combo')
export class ComboEntity {

    @PrimaryColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column({ type: 'double precision', name: 'specialPrice' })
    specialPrice: number;

    @Column('varchar')
    currency: string;

    @Column('varchar')
    description: string;

    @Column({ type: 'varchar', name: 'comboImage' })
    comboImage: string;

    @Column({ type: 'json' })
    products: string[];
}