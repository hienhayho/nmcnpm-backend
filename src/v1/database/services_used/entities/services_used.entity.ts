import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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
        
    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)'})
    updatedAt: Date;
}
