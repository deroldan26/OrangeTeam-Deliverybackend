import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Discount')
export class DiscountEntity {

    @PrimaryColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    description: string;

    @Column({ type: 'date', nullable: true,
        transformer: {
            to: (value: Date) => value, 
            from: (value: any) => value ? new Date(value) : null,  // Asegura que se convierte a Date al obtener
          }
    })
    expireDate: Date | null;

    @Column({ type: 'date', nullable: true,
        transformer: {
            to: (value: Date) => value, 
            from: (value: any) => value ? new Date(value) : null,  // Asegura que se convierte a Date al obtener
          }
    })
    initDate: Date | null;

    @Column({ type: 'double precision', name: 'percentage' })
    percentage: number;
}