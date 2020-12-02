import {Injectable} from "@nestjs/common";
import {Admin} from "../../db/entities/admin.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private  adminRepository: Repository<Admin>
    ) {
    }

    async findAllAdmin(): Promise<Admin[]> {
        return await this.adminRepository.find()
    }

    async findAdmin(login:string): Promise<Admin | undefined> {
        return await this.adminRepository.findOne({where:{login}});
    }

    async createAdmin(admin): Promise<Admin> {
        return await this.adminRepository.save(admin);
    }

}
