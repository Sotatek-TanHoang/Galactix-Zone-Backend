import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '@modules/users/providers/User.repository';
import { UserService } from '@modules/users/providers/User.service';
import { UserModule } from '@modules/users/User.module';

import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        PassportModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
    exports: [AuthService],
})
export class AuthModule {}
