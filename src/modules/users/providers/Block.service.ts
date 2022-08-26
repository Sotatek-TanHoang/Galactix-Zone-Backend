import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { BasePaginationResponseDto } from '@core/base-response.dto';

import { UserRepository } from './Block.repository';
import { BlocksRequestDto } from './dtos/block-request.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) {}

}
