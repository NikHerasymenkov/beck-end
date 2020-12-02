import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {CompanyService} from "./company.service";
import {Company} from "../../db/entities/company.entity";
import {DeleteResult} from "typeorm";

@Controller('company')
export class CompanyController {
    constructor(
        private companyService:CompanyService
    ) {
    }
    @Get()
    async findAllCompany():Promise<Company[]>{
        return await this.companyService.findAllCompany()
    }
    @Get()
    async findCompany(@Param()params):Promise<Company>{
        return await this.companyService.findCompany(params.name)
    }
    @Post()
    async  createCompany(@Body()body):Promise<Company>{
        return await this.companyService.createCompany(body)
    }
    @Put()
    async updateUser(
        @Param('name')name: string,
        @Body()body
    ): Promise<Company> {
        return await this.companyService.updateCompany(body.name)
    }
    @Delete()
    async delete(
        @Param('id') id: string
    ): Promise<DeleteResult> {
        return await this.companyService.removeCompany(id)
    }

}
