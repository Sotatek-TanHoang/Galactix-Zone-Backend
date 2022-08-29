import { Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '@shared/auth/auth.service';
import { JwtAuthGuard } from '@shared/auth/jwt-auth.guard';
import { AuthGuard } from '@shared/guards/admin.guard';

import { UserRequestDto } from './providers/dtos/user-request.dto';
import { UserResponseDto } from './providers/dtos/user-response.dto';
import { UserService } from './providers/User.service';

@Controller('')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService, private authService: AuthService) {}

    @Post('/login')
    @ApiOkResponse({ type: UserResponseDto })
    handleUserLogin() {
        const res = { res: this.authService.login({ res: `12` }) };

        console.log('====================================');
        console.log(res);
        console.log('====================================');
        return 'ok';
    }

    @Post('/admin/login')
    @ApiOkResponse({ type: UserResponseDto })
    handleAdminLogin() {
        return 'login admin ok';
    }

    @Post('/admin')
    @ApiOkResponse({ type: UserResponseDto })
    handleCreateAdmin() {
        return 'create admin ok';
    }
    @Put('/admin')
    @ApiOkResponse({ type: UserResponseDto })
    handleUpdateAdmin() {
        return 'edit admin ok';
    }

    @UseGuards(JwtAuthGuard)
    @Get('/admin')
    @ApiOkResponse({ type: UserResponseDto })
    handleGetManyAdmin(@Req() req) {
        return { res: 'get many admin ok', user: req.user };
    }
    @Get('/admin/:id')
    @ApiOkResponse({ type: UserResponseDto })
    handleGetSingleAdmin() {
        return 'get single admin ok';
    }
}
