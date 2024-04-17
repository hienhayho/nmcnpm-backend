import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Max, Min } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  @Min(1)
  @Max(3)
  gender: number;

  @Column({ unique: true })
  email: string;

  @Column()
  fullName: string;

  @Column()
  salary: number;

  @Column({ default: null })
  field: null | number;

  @Column()
  city: string

  @Column()
  country: string

  @ManyToOne(() => Role)
  role: Role
}
