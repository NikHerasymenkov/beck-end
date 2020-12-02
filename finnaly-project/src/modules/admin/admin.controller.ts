import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {AdminService} from "./admin.service";
import {Admin} from "../../db/entities/admin.entity";

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}
    @Get()
    async findAllAdmin():Promise<Admin[]>{
        return await this.adminService.findAllAdmin()
    }
    @Get()
    async findAdmin(@Param() login:string): Promise<Admin|undefined> {
        return await this.adminService.findAdmin(login);
    }
    @Post()
    async createAdmin(@Body()body):Promise<Admin>{
        return await this.adminService.createAdmin(body)
    }
}
