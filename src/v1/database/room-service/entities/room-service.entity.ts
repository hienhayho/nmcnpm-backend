import { BeforeInsert, BeforeUpdate, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoomType } from "../../room_type/entities/room_type.entity";
import { Service } from "../../services/entities/service.entity";
import * as moment from 'moment-timezone';

@Entity()
export class RoomService {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => RoomType, {nullable: false})
    roomType: RoomType

    @ManyToOne(() => Service, {nullable: false})
    service: Service

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
