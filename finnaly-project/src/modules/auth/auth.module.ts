import {Module} from "@nestjs/common";
import {AdminModule} from "../admin/admin.module";
import {AuthService} from "./auth.service";
import {LocalStrategy} from "./local.strategy";
import {PassportModule} from "@nestjs/passport";
import {AuthController} from "./auth.controller";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtStrategy} from "./jwt.strategy";
import {UserModule} from "../user/user.module";


@Module({
    imports:[
        AdminModule,
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
        imports:[ConfigModule],
            useFactory:(configService:ConfigService)=>({
            secret:configService.get<string>("JWT_SECRET"),
            signOptions:{expiresIn:configService.get<string>("JWT_EXPIRES_IN")}
        }),
            inject:[ConfigService]
        })

    ],
    controllers:[AuthController],
    providers:[AuthService,LocalStrategy,JwtStrategy]
})
export class AuthModule {}
