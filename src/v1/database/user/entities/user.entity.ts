import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  gender: number;

  @Column()
  email: string;

  @Column()
  fullName: string;

  @Column()
  salary: number;

  @Column()
  field: null | number;

  @Column()
  city: string

  @Column()
  country: string

  @ManyToOne(() => Role)
  role: Role
}
