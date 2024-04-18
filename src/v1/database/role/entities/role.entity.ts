import { Column, Entity, OneToMany, PrimaryColumn, } from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)'})
    updatedAt: Date;
}
