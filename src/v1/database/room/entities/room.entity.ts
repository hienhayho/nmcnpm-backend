import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "../../services/entities/service.entity";

@Entity()
export class Room {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    capacity: number;

    @Column()
    base_price: number;

    @Column("int", { array: true })
    roomListNumbers: number[];

    @OneToMany(()=>Service, (service)=>service.room)
    services: number[];
}
