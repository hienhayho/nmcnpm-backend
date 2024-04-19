import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import * as moment from "moment-timezone"
import { Service } from "../../services/entities/service.entity";

@Entity()
export class RoomType {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    capacity: number;

    @Column()
    price_base: number;

    @OneToMany(() => Service, (service) => service.roomType)
    services: Service[]

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
