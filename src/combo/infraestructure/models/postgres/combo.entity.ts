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

    @Column({ type: 'json' })
    comboImages: string[];

    @Column({ type: 'json' })
    products: string[];

    @Column('integer')
    weight: number;

    @Column('varchar')
    measurement: string;

    @Column('integer')
    stock: number;

    @Column({ type: 'date', nullable: true})
    caducityDate: Date;

    @Column({ type: 'json' })
    categories: string[];

    @Column( {type: 'varchar', nullable: true})
    discount: string;
}