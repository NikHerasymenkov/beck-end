import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository} from 'typeorm';
import {User} from '../../db/entities/user.entity';
import *as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
    }

    async findUsersCompany():Promise<User[]>{
        return await this.userRepository.createQueryBuilder('user')
            .where("user.deletedAt is NULL")
            .leftJoinAndSelect("user.company","company")
            .getMany()
    }
    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.find()
    }

    async createUser(user): Promise<User> {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const userHash = await bcrypt.hash(user.password, salt)
        user.password = userHash
        return await this.userRepository.save(user);
    }

    async findUser(login: string): Promise<User | undefined> {
        return this.userRepository.findOne(login)
    }

    async updateUser(user:User):Promise<User> {
       const updateOneUser= await this.userRepository.findOne(user.id)
        return await this.userRepository.save(updateOneUser)
    }
    async remove(id:string): Promise<DeleteResult> {
        return await this.userRepository.delete(id)
    }
}
