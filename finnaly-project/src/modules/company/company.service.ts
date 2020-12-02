import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Company} from "../../db/entities/company.entity";
import {DeleteResult, Repository} from "typeorm";

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private companyRepository:Repository<Company>
    ) {
    }
    async findAllCompany(): Promise<Company[]> {
        return await this.companyRepository.find()
    }
    async findCompany(name: string): Promise<Company | undefined> {
        return await this.companyRepository.findOne(name)
    }
    async createCompany(company):Promise<Company>{
        return await this.companyRepository.save(company)
    }
    async updateCompany(company:Company):Promise<Company> {
        const updateOneCompany= await this.companyRepository.findOne(company.id)
        return await this.companyRepository.save(updateOneCompany)
    }
    async removeCompany(id:string): Promise<DeleteResult> {
        return await this.companyRepository.delete(id)
    }

}
