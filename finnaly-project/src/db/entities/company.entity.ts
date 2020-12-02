import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity, JoinColumn, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {User} from "./user.entity";

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    address: string;
    @Column()
    serviceOfActivity: string;
    @Column()
    numberOfEmployees: number;
    @Column()
    description: string;
    @Column()
    type: string;
    @CreateDateColumn({type: 'timestamp'})
    createAt: Date;
    @UpdateDateColumn({type: 'timestamp'})
    updateAt: Date;
    @DeleteDateColumn({type: 'timestamp', nullable: true, name: 'deleted_at'})
    deletedAt: Date;
    @ManyToOne(
        type=> User,
        user => user.company
    )
    @JoinColumn()
    user:User;
}
