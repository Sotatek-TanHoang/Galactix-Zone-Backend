import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@shared/auth/auth.module';
import { AdminRepository } from './providers/Admin.repository';
import { AdminService } from './providers/Admin.service';

import { UserRepository } from './providers/User.repository';
import { UserService } from './providers/User.service';
import { UserController } from './User.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository,AdminRepository]), AuthModule],
    controllers: [UserController],
    providers: [UserService, AdminService],
    exports: [UserService,AdminService],
})
export class UserModule {}
