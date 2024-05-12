import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as moment from "moment-timezone"
import { RoomDetail } from "../../room_detail/entities/room_detail.entity";
import { Service } from "../../services/entities/service.entity";

@Entity()
export class ServicesUsed {
    @PrimaryGeneratedColumn("identity")
    servicesUsedId: number

    @ManyToOne(() => RoomDetail)
    roomDetail: RoomDetail

    @ManyToOne(() => Service)
    service: Service

    @Column()
    quantity: number

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;

    @BeforeInsert()
    insertCreated() {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.createdAt = new Date(
            moment().tz(timezone).format()
        );
        this.updatedAt = new Date(
            moment().tz(timezone).format()
        );
    }

    @BeforeUpdate()
    insertUpdated() {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.updatedAt = new Date(
            moment().tz(timezone).format()
        )
    }
}
