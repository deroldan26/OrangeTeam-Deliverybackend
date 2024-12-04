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

    @Column({type: 'integer'})
    weight: number;

    @Column({type: 'varchar'})
    measurement: string;

    @Column({type: 'integer'})
    stock: number;

    @Column({ type: 'date', nullable: true })
    caducityDate: Date | null;

    @Column({ type: 'json' })
    categories: string[];

    @Column( {type: 'varchar', nullable: true})
    discount: string;
}