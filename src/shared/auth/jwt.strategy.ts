import { UserService } from '@modules/users/providers/User.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService:UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret',
        });
    }

    async validate(payload: any) {
        
        const user=await this.userService.findOne({wallet_address:payload.wallet_address})
        return user;
    }
}
