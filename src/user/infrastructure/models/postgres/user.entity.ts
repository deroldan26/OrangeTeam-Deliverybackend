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
    })
    username: string
    @Column({
        type: 'varchar',
    })
    password: string
    @Column({
        type: 'varchar',
    })
    phone: string
}
