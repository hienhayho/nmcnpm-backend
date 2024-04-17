import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;
}
