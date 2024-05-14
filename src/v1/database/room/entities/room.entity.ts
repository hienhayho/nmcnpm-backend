import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoomType } from "../../room_type/entities/room_type.entity";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import * as moment from 'moment-timezone';

@Entity()
export class Room {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({
        unique: true,
        nullable: false
    })
    roomNumber: number

    @ManyToOne(() => RoomType, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    roomType: RoomType

    @Column({
        nullable: false,
        default:true 
    })
    active: boolean

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
