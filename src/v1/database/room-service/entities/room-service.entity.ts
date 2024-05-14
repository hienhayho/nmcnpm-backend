import { BeforeInsert, BeforeUpdate, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as moment from 'moment-timezone';
import { RoomType } from "../../room_type/entities/room_type.entity";
import { Service } from "../../services/entities/service.entity";

@Entity()
export class RoomService {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => RoomType, roomType => roomType.roomService, {
        nullable: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    roomType: RoomType

    @ManyToOne(() => Service, service => service.roomService, {
        nullable: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    service: Service

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
