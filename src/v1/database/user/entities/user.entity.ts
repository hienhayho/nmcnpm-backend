import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as moment from "moment-timezone"
import { Max, Min } from 'class-validator';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({
    unique: true,
    nullable: false
  })
  userName: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false
  })
  phone: string;

  @Column({
    nullable: false
  })
  @Min(1)
  @Max(3)
  gender: number;

  @Column({
    unique: true,
    nullable: false
  })
  email: string;

  @Column({
    nullable: false
  })
  fullName: string;

  @Column({
    nullable: true
  })
  salary: number;

  @Column({
    nullable: true
  })
  city: string

  @Column({
    nullable: true
  })
  country: string

  @Column({
    nullable: true
  })
  avatar: string

  @ManyToOne(() => Role, role => role.id,
    { nullable: false, onDelete: "CASCADE" }
  )
  role: Role

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
