import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import * as moment from 'moment-timezone';
import { User } from "../../user/entities/user.entity";
import { Room } from "../../room/entities/room.entity";
import { Bill } from "../../bill/entities/bill.entity";

@Entity()
export class RoomDetail {
    @PrimaryGeneratedColumn("increment")
    id: number

    @ManyToOne(() => User)
    user: User

    @ManyToOne(() => Room)
    room: Room

    @Column()
    numberUsers: number

    @Column()
    checkIn: Date

    @Column({
        nullable: true
    })
    checkOut: Date

    @OneToOne(() => Bill, bill => bill.roomDetail, { eager: true, onDelete: "CASCADE", nullable: true })
    bill: Bill

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
