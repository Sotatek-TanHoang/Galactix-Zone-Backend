import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '@modules/users/providers/User.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(wallet_address: string): Promise<any> {
        const user = await this.usersService.findOne({ wallet_address });
        if (user) {
            return user;
        }
        return null;
    }
    async login(user: any) {
        return {
            jwt: this.jwtService.sign(user),
        };
    }
}
