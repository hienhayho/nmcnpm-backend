import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoomType } from "../../room_type/entities/room_type.entity";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Room {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => RoomType)
    roomType: RoomType

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)'})
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)'})
    updatedAt: Date    
}
