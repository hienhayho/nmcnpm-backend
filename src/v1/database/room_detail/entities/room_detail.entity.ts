import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import * as moment from 'moment-timezone';
import { User } from "../../user/entities/user.entity";
import { Room } from "../../room/entities/room.entity";
import { Bill } from "../../bill/entities/bill.entity";
import { ServicesUsed } from "../../services_used/entities/services_used.entity";

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

    @Column()
    checkOut: Date

    @Column('decimal', { precision: 6, scale: 2 })
    discount: number

    @OneToOne(() => Bill, bill => bill.roomDetail, {eager: true, onDelete: "CASCADE"})
    bill: Bill

    @OneToMany(() => ServicesUsed, (servicesUsed) => servicesUsed.roomDetail)
    servicesUsed: ServicesUsed[]

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
