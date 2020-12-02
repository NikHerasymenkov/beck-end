import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './db/entities/user.entity';
import {UserModule} from "./modules/user/user.module";
import {AuthModule} from "./modules/auth/auth.module";
import {AdminModule} from "./modules/admin/admin.module";
import {Admin} from "./db/entities/admin.entity";
import {ConfigModule} from "@nestjs/config"
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {Company} from "./db/entities/company.entity";
import {CompanyModule} from "./modules/company/company.module";


@Module({
    imports: [
        AdminModule,
        UserModule,
        CompanyModule,
        AuthModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([Company]),
        TypeOrmModule.forFeature([Admin]),
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: '127.0.0.1',
            port: 5432,
            database: 'dev-backend',
            username: 'postgres',
            password: '12345',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: false,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
