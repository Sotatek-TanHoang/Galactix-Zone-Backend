import { Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './providers/User.service';
import { UserRequestDto } from './providers/dtos/user-request.dto';
import { UserResponseDto } from './providers/dtos/user-response.dto';
import { AuthGuard } from '@shared/guards/admin.guard';

@Controller('')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post('/login')
    @ApiOkResponse({ type: UserResponseDto })
    handleUserLogin() {
        return 'login public user ok'
    }

    @Post('/admin/login')
    @ApiOkResponse({ type: UserResponseDto })
    handleAdminLogin() {
        return 'login admin ok'
    }
    
    @Post('/admin')
    @ApiOkResponse({ type: UserResponseDto })
    handleCreateAdmin() {
        return 'create admin ok'
    }
    @Put('/admin')
    @ApiOkResponse({ type: UserResponseDto })
    handleUpdateAdmin() {
        return 'edit admin ok'
    }
    @Get('/admin')
    @ApiOkResponse({ type: UserResponseDto })
    @UseGuards(AuthGuard)
    handleGetManyAdmin(@Req() req) {

        return 'get many admin ok'
    }
    @Get('/admin/:id')
    @ApiOkResponse({ type: UserResponseDto })
    handleGetSingleAdmin() {
        return 'get single admin ok'
    }
}
