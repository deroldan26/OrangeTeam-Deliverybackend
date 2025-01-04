import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('Audit')
export class AuditEntity {
    @PrimaryColumn(
        'uuid',
    )
    id: string
    @Column(
        'varchar',
    )
    userId: string
    @Column(
        'date',
    )
    time: Date
    @Column({
        type: 'varchar',
        nullable: true
    })
    operation: string
    @Column({ type: 'json'  })
    data: string[];
}
