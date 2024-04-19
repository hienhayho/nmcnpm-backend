import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import * as moment from "moment-timezone"
import { RoomType } from "../../room_type/entities/room_type.entity";

@Entity()
export class Service {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @ManyToOne(() => RoomType, { onDelete: "CASCADE" })
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
