import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";
import * as moment from "moment-timezone"
import { RoomService } from "../../room-service/entities/room-service.entity";

@Entity()
export class Service {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ unique: true, nullable: false })
    name: string;

    @Column("bigint", { nullable: false })
    price: number;

    @OneToMany(() => RoomService, (roomService) => roomService.service, {
        cascade: true
    })
    roomService: RoomService[]

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
