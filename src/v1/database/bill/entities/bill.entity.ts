import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import * as moment from "moment-timezone";
@Entity()
export class Bill {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    priceAll: number

    @ManyToOne(() => User)
    user: User

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
