import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { BasePaginationResponseDto } from '@core/base-response.dto';

import { CreateUserDto, LoginUserDto, UserRequestDto } from './dtos/user-request.dto';
import { UserRepository } from './User.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) {}
    async findOne(req: UserRequestDto) {
        return this.userRepo.getOne(req);
    }
    async createOne(req: CreateUserDto) {
        return this.userRepo.saveOne(req);
    }
}
