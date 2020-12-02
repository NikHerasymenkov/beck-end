import {Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {Connection} from "typeorm";
import {Admin} from "../../db/entities/admin.entity";
import {AdminService} from "../admin/admin.service";

@Controller('auth')
export class AuthController {
    constructor(
        private  authService: AuthService,
        private adminService: AdminService,
        private connection: Connection
    ) {
        this.connection.getRepository(Admin)
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request()req) {
        return this.authService.login(req.user)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request()req) {
        return req.user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('refresh')
    async refresh(@Request()req) {
        const admin = await this.adminService.findAdmin(req.user.id)
        return this.authService.login(admin)
    }
}
