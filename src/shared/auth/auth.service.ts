import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AdminService } from '@modules/admins/providers/Admin.service';
import { UserService } from '@modules/users/providers/User.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        private adminService: AdminService,
        private jwtService: JwtService,
    ) {}

    async validateUser(wallet_address: string): Promise<any> {
        const user = await this.userService.findOne({ wallet_address });
        if (user) {
            return user;
        }
        return null;
    }
    async validateAdmin(wallet_address: string): Promise<any> {
        const user = await this.adminService.findOne({ wallet_address });
        if (user) {
            return user;
        }
        return null;
    }
    async signJWT(user: any) {
        return this.jwtService.sign(user);
    }
}
