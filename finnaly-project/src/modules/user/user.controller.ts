import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from '../../db/entities/user.entity';
import {DeleteResult} from "typeorm";


@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Get('company')
    async findUsersCompany():Promise<User[]>{
        return await this.userService.findUsersCompany()
    }

    @Get()
    async findAllUsers(): Promise<User[]> {
        return await this.userService.findAllUsers();
    }

    @Get(':id')
    async findUser(@Param() params): Promise<User> {
        return await this.userService.findUser(params.id)
    }

    @Post()
    async createUser(@Body()body): Promise<User> {
        return await this.userService.createUser(body)
    }

    @Put()
    async updateUser(
        @Param('id')id: string,
        @Body()body
    ): Promise<User> {
        return await this.userService.updateUser(body.id)
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string
    ): Promise<DeleteResult> {
        return await this.userService.remove(id)
    }
}
