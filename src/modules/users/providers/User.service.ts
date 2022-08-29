import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { BasePaginationResponseDto } from '@core/base-response.dto';

import { UserRequestDto } from './dtos/user-request.dto';
import { UserRepository } from './User.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) {}
    async findOne(req: any) {
        return this.userRepo.findOne(req);
    }
}
