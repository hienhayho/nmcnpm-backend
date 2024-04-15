import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { RoomDetail } from "../../room_detail/entities/room_detail.entity";
import { Service } from "../../services/entities/service.entity";

@Entity()
export class ServicesUsed {
    @PrimaryGeneratedColumn("identity")
    servicesUsed: number
    
    @ManyToOne(()=>RoomDetail)
    roomDetail: RoomDetail

    @ManyToOne(()=>Service)
    service: Service

    @Column()
    quantity: number
}
