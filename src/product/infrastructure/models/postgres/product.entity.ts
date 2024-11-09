import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('Product')
export class ProductEntity {
    @PrimaryColumn(
        'uuid',
    )
    id: string
    // @Column({
    //     type: 'varchar',
    // })
    // description: string
    // @Column({
    //     type: 'varchar',
    // })
    // weight: string
    // @Column({
    //     type: 'integer',
    // })
    // price: number
    // @Column({
    //     type: 'varchar',
    // })
    // stock: string
    // @Column({
    //     type: 'varchar',
    // })
    // currency: string
    // @Column({
    //     type: 'uuid',
    // })
    // image: string
    @Column(
        'varchar',
    )
    name: string
}
