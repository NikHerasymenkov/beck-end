import {
  Column,
  CreateDateColumn, DeleteDateColumn,
  Entity, JoinColumn, OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import {Company} from "./company.entity";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  login: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  phoneNumber: number;
  @Column()
  position: string;
  @Column()
  description: string;
  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
  @DeleteDateColumn({ type: 'timestamp', nullable: true, name: 'deleted_at' })
  deletedAt: Date;
  @OneToMany(
      type=>Company,
      company=>company.user
  )
  @JoinColumn()
  company:Company[];
}
