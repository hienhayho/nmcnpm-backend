import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  gender: string;

  @Column()
  email: string;

  @Column()
  fullname: string;

  @Column()
  salary: number;

  @Column()
  field: null | number;

  @Column()
  city: string

  @Column()
  country: string

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role
}
