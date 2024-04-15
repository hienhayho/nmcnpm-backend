import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
