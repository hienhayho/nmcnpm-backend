import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "../../room/entities/room.entity";

@Entity()
export class Service {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @ManyToOne(()=>Room,(room)=>room.services)
    room: Room
}
