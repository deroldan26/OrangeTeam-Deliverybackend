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
        type: 'varchar',
    })
    image: string
    @Column({
        type: 'integer',
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
}
