import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany,
    DeleteDateColumn,
} from "typeorm";
import * as moment from "moment-timezone";
import { RoomService } from "../../room-service/entities/room-service.entity";

@Entity()
export class RoomType {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ unique: true, nullable: false })
    name: string;

    @Column({ nullable: false })
    capacity: number;

    @Column({ nullable: true })
    desc: string;

    @Column({ nullable: false })
    priceBase: number;

    @Column({ nullable: true })
    roomImage: string;

    @OneToMany(() => RoomService, (roomService) => roomService.roomType, {
        eager: true,
        cascade: true,
    })
    roomService?: RoomService[];

    @CreateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
    })
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @BeforeInsert()
    insertCreated() {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.createdAt = new Date(moment().tz(timezone).format());
        this.updatedAt = new Date(moment().tz(timezone).format());
    }

    @BeforeUpdate()
    insertUpdated() {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.updatedAt = new Date(moment().tz(timezone).format());
    }
}
