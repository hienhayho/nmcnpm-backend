import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Bill {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    priceAll: number

    @Column()
    fullName: string

    @Column()
    phone: string

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)'})
    updatedAt: Date
}
