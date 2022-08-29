import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { BasePaginationResponseDto } from '@core/base-response.dto';

import { CreateUserDto, LoginUserDto, UserRequestDto } from './dtos/user-request.dto';
import { AdminRepository } from './Admin.repository';

@Injectable()
export class AdminService {
    constructor(private readonly adminRepo: AdminRepository) {}
    async findOne(req: UserRequestDto) {
        return this.adminRepo.getOne(req);
    }
    async createOne(req:CreateUserDto){
        return this.adminRepo.saveOne(req)
    }
}
