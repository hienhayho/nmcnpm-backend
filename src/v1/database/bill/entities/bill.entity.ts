import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import * as moment from "moment-timezone";
import { RoomDetail } from "../../room_detail/entities/room_detail.entity";
@Entity()
export class Bill {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column('decimal', { precision: 64, scale: 2 })
    priceAll: number

    @ManyToOne(() => User)
    user: User

    @Column()
    paid: boolean

    @OneToOne(() => RoomDetail, roomDetail => roomDetail.bill, {onDelete: "CASCADE"})
    @JoinColumn()
    roomDetail: RoomDetail

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
