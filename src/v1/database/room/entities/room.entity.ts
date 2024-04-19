import { BeforeInsert, BeforeUpdate, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoomType } from "../../room_type/entities/room_type.entity";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import * as moment from 'moment-timezone';

@Entity()
export class Room {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => RoomType)
    roomType: RoomType

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
