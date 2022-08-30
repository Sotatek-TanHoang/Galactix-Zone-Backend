import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@shared/auth/auth.module';

import { AdminController } from './Admin.controller';
import { AdminRepository } from './providers/Admin.repository';
import { AdminService } from './providers/Admin.service';

@Module({
    imports: [TypeOrmModule.forFeature([AdminRepository]), AuthModule],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService],
})
export class AdminModule {}
