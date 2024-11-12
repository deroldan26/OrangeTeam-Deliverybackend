import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Combo')
export class ComboEntity {

    @PrimaryColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('float')
    specialPrice: number;

    @Column('varchar')
    currency: string;

    @Column('varchar')
    description: string;

    @Column('varchar')
    comboImage: string;

    @Column('json')
    products: string[];
}