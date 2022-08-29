import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './User.controller';
import { UserRepository } from './providers/User.repository';
import { UserService } from './providers/User.service';
import { AuthService } from '@shared/auth/auth.service';
import { AuthModule } from '@shared/auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository]),AuthModule],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
