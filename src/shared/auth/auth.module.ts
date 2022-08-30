import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '@modules/users/providers/User.repository';
import { UserService } from '@modules/users/providers/User.service';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AdminService } from '@modules/admins/providers/Admin.service';
import { AdminRepository } from '@modules/admins/providers/Admin.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository,AdminRepository]),
        PassportModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [AuthService, JwtStrategy, UserService,AdminService],
    exports: [AuthService],
})
export class AuthModule {}
