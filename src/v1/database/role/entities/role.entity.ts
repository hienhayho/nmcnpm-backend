import { AfterUpdate, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn, } from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import * as moment from "moment-timezone";

function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}
@Entity()
export class Role {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn({type: 'timestamp', default: () => 'LOCALTIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', default: () => 'LOCALTIMESTAMP'})
    updatedAt: Date;

    @BeforeInsert()
    insertCreated() {
        this.createdAt = new Date(
            moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss")
        );
        this.updatedAt = new Date(
            moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss")
        );
    }

    @BeforeUpdate()
    insertUpdated() {
        this.updatedAt = new Date(
            moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD hh:mm:ss")
        )
    }
}
