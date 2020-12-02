import {AdminService} from "../admin/admin.service";
import {Admin} from "../../db/entities/admin.entity";
import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Connection} from "typeorm";
import *as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private adminService: AdminService,
        private connection: Connection
    ) {
        this.connection.getRepository(Admin)
    }

    async validateAdmin(login: string, pass: string): Promise<any | null> {
        const admin: Admin = await this.adminService.findAdmin(login)
        if (admin && await bcrypt.compare(pass, admin.passwordHash)) {
            const {passwordHash, ...secureAdmin} = admin;
            return secureAdmin;
        }
        return null
    }

    async login(admin:Admin) {
        const payload = {id: admin.id};
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }
}
