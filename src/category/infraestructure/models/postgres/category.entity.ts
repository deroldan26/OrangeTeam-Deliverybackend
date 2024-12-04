import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Category')
export class CategoryEntity {

    @PrimaryColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    image: string;
}