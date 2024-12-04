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

    @Column({ type: 'json', nullable: true })
    comboImages: string[];

    @Column({ type: 'json' })
    products: string[];

    @Column({type: 'integer', nullable: true})
    weight: number;

    @Column({type: 'varchar', nullable: true})
    measurement: string;

    @Column({type: 'integer', nullable: true})
    stock: number;

    @Column({ type: 'date', nullable: true})
    caducityDate: Date | null;

    @Column({ type: 'json', nullable: true})
    categories: string[];

    @Column( {type: 'varchar', nullable: true})
    discount: string;
}