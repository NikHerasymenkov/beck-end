import {
    Column, CreateDateColumn,
    Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('admin')
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable:false})
    login: string;
    @Column({nullable:false})
    passwordHash?: string;
    @Column({nullable:false})
    nickName:string
    @CreateDateColumn({type: 'timestamp'})
    createAt: Date;
    @UpdateDateColumn({type: 'timestamp'})
    updateAt: Date;
}
