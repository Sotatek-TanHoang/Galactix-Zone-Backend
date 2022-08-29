import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@shared/auth/auth.module';

import { UserRepository } from './providers/User.repository';
import { UserService } from './providers/User.service';
import { UserController } from './User.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository]), AuthModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
