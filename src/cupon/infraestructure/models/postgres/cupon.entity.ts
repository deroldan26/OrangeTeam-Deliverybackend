import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Cupon')
export class CuponEntity {

    @PrimaryColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column({ type: 'double precision', name: 'value' })
    value: number;

    @Column('varchar')
    description: string;

    @Column({ type: 'timestamp', nullable: true,
        transformer: {
            to: (value: Date) => value, 
            from: (value: any) => value ? new Date(value) : null,  // Asegura que se convierte a Date al obtener
          }
    })
    expireDate: Date | null;

    @Column({ type: 'timestamp', nullable: true,
        transformer: {
            to: (value: Date) => value, 
            from: (value: any) => value ? new Date(value) : null,  // Asegura que se convierte a Date al obtener
          }
    })
    startDate: Date | null;
}