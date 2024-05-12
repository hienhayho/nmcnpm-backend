import { BeforeInsert, BeforeUpdate, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import * as moment from 'moment-timezone';

@Entity()
export class Manage {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => User, { nullable: false })
    user: User

    @ManyToOne(() => User, { nullable: false })
    manager: User

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
