import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { BasePaginationResponseDto } from '@core/base-response.dto';

import { UserRepository } from './User.repository';
import { UserRequestDto } from './dtos/user-request.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) {}

}
