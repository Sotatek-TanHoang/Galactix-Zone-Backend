import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { EEnvKey } from '@constants/env.constant';

import { AdminService } from '@modules/admins/providers/Admin.service';
import { UserService } from '@modules/users/providers/User.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private adminService: AdminService, private jwtService: JwtService) {}

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
    async signUserJWT(user: any) {
        try {
            return this.jwtService.sign(user, {
                privateKey: process.env[EEnvKey.USER_JWT],
            });
        } catch (e) {
            console.log(e.message);
            throw new HttpException('Internal Server Error!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async signAdminJwt(admin: any) {
        try {
            return this.jwtService.sign(admin, {
                privateKey: process.env[EEnvKey.ADMIN_JWT],
            });
        } catch (e) {
            console.log(e.message);
            throw new HttpException('Internal Server Error!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
