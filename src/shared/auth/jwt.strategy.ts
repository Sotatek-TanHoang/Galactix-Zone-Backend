import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserEntity } from '@entities/User.entity';

import { UserService } from '@modules/users/providers/User.service';
import { AdminService } from '@modules/admins/providers/Admin.service';
import { AdminEntity } from '@entities/Admin.entity';
import { EAuthGuard } from '@constants/auth.constant';
import { EEnvKey } from '@constants/env.constant';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy,EAuthGuard.USER_GUARD) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env[EEnvKey.USER_JWT],
        });
    }

    async validate(payload: UserEntity) {
        console.log('validate user');
        const user = await this.userService.findOne({ wallet_address: payload.wallet_address });
        return user;
    }
}

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy,EAuthGuard.ADMIN_GUARD) {
    constructor(private adminService: AdminService,private configService:ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env[EEnvKey.ADMIN_JWT],
        });
    }

    async validate(payload: AdminEntity) {
        console.log('validate admin');
        
        const user = await this.adminService.findOne({ wallet_address: payload.wallet_address });
        return user;
    }
}
