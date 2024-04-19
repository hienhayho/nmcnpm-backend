import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as moment from "moment-timezone"
import { RoomDetail } from "../../room_detail/entities/room_detail.entity";
import { Service } from "../../services/entities/service.entity";

@Entity()
export class ServicesUsed {
    @PrimaryGeneratedColumn("identity")
    servicesUsed: number

    @ManyToOne(() => RoomDetail)
    roomDetail: RoomDetail

    @ManyToOne(() => Service)
    service: Service

    @Column()
    quantity: number

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;

    @BeforeInsert()
    insertCreated() {
        this.createdAt = new Date(
            moment().utc().format("YYYY-MM-DD HH:mm:ss")
        );
        this.updatedAt = new Date(
            moment().utc().format("YYYY-MM-DD HH:mm:ss")
        );
    }

    @BeforeUpdate()
    insertUpdated() {
        this.updatedAt = new Date(
            moment().utc().format("YYYY-MM-DD hh:mm:ss")
        )
    }
}
