import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Room } from "../../room/entities/room.entity";
import { Bill } from "../../bill/entities/bill.entity";
import { ServicesUsed } from "../../services_used/entities/services_used.entity";

@Entity()
export class RoomDetail {
    @PrimaryGeneratedColumn("increment")
    id: number

    @ManyToOne(()=>User)
    user:User
    
    @ManyToOne(()=>Room)
    room:Room

    @Column()
    number_users: number

    @Column()
    check_in: Date

    @Column()
    check_out: Date

    @Column()
    discount: number

    @OneToOne(()=>Bill)
    @JoinColumn()
    bill: Bill
    
    @OneToMany(()=>ServicesUsed, (services_used)=> services_used.roomDetail)
    services_used: ServicesUsed[]
}
