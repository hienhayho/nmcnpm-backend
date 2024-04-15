import { Column, Entity, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { RoomDetail } from "../../room_detail/entities/room_detail.entity";

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
