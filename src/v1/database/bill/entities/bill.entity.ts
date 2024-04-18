import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Bill {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    priceAll: number

    @ManyToOne(() => User)
    user: User

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)'})
    updatedAt: Date
}
