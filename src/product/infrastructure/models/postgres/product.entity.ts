import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('Product')
export class ProductEntity {
    @PrimaryColumn(
        'uuid',
    )
    id: string
    @Column(
        'varchar',
    )
    name: string
    @Column({
        type: 'varchar',
    })
    description: string
    @Column({
        type: 'json',
        nullable: true
    })
    images: string[]
    @Column({
        type: 'float',
    })
    price: number
    @Column({
        type: 'varchar',
    })
    currency: string
    @Column({
        type: 'integer',
    })
    weight: number
    @Column({
        type: 'varchar',
        nullable: true
    })
    measurement: string;

    @Column({
        type: 'integer',
    })
    stock: number
    @Column({
        type: 'varchar',
    })
    category: string

    @Column({ type: 'date', 
        nullable: true})
    caducityDate: Date | null;

    @Column({ type: 'json', nullable: true })
    categories: string[];

    @Column( {type: 'varchar', 
        nullable: true})
    discount: string;
}
