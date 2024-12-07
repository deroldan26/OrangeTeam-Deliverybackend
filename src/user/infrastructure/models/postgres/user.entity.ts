import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('User')
export class UserEntity {
    @PrimaryColumn(
        'uuid',
    )
    id: string
    @Column(
        'varchar',
    )
    email: string
    @Column({
        type: 'varchar',
        nullable: true
    })
    name: string
    @Column({
        type: 'varchar',
    })
    password: string
    @Column({
        type: 'varchar',
    })
    phone: string
    @Column({
        type: 'varchar',
        nullable: true
    })
    type: string
}
