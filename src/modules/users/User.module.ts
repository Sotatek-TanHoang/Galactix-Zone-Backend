import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlockController } from './Block.controller';
import { UserRepository } from './providers/Block.repository';
import { UserService } from './providers/Block.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    controllers: [BlockController],
    providers: [UserService],
})
export class UserModule {}
