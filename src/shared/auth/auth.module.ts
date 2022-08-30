import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminRepository } from '@modules/admins/providers/Admin.repository';
import { AdminService } from '@modules/admins/providers/Admin.service';
import { UserRepository } from '@modules/users/providers/User.repository';
import { UserService } from '@modules/users/providers/User.service';

import { AuthService } from './auth.service';
import { UserJwtStrategy,AdminJwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, AdminRepository]),
        PassportModule,
        JwtModule.register({
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [AuthService, AdminJwtStrategy,UserJwtStrategy, UserService, AdminService],
    exports: [AuthService],
})
export class AuthModule {}
