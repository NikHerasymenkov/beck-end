import {MigrationInterface, QueryRunner, Repository} from "typeorm";
import {Admin} from "../entities/admin.entity";
import *as bcrypt from 'bcrypt'

export class FirstAdmin1606641103485 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const adminService: Repository<Admin> = queryRunner.connection.getRepository(Admin)
        if (await adminService.findOne({where: {login: 'admin'}})) {
            return;
        }
        const admin: Admin = adminService.create({
            login: 'admin',
            passwordHash: await bcrypt.hash('strong', 10),
            nickName: 'Nikita'
        })
        await adminService.insert(admin)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const adminService: Repository<Admin> = queryRunner.connection.getRepository(Admin)
        const admin: Admin = await adminService.findOne()
        if (!admin) {
            return
        }
        await adminService.remove(admin)
    }
}
