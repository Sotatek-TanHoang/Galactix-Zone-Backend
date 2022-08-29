import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

import { UserRepository } from '@modules/users/providers/User.repository';

import { AuthService } from '@shared/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            return true;
        } catch (e) {
            console.log('====================================');
            console.log(e.message);
            console.log('====================================');
            return false;
        }
    }
}
