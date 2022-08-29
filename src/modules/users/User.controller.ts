import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './providers/User.service';
import { UserRequestDto } from './providers/dtos/user-request.dto';
import { UserResponseDto } from './providers/dtos/user-response.dto';

@Controller('user')
@ApiTags('User')
export class BlockController {
    constructor(private readonly userService: UserService) {}

   
    @Get('/login')
    @ApiOkResponse({ type: UserResponseDto })
    getBlockByHash() {
        return 'ok'
    }
}
