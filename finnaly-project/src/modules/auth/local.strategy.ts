import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {Strategy} from "passport-local";
import {Admin} from "../../db/entities/admin.entity";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'login'
        });
    }

    async validate(login: string, password: string): Promise<any> {
        const admin:Admin = await this.authService.validateAdmin(login, password)
        if(!admin){
            throw new UnauthorizedException();
        }
        return admin
    }
}
