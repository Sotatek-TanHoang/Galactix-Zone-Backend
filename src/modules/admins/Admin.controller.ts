import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { EUserRole } from '@constants/user.constant';


import { AuthService } from '@shared/auth/auth.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { SignatureValidationPipe } from '@shared/pipes/signature.pipe';
import { formatReponseSuccess } from '@shared/utils/format';
import { Roles } from '@shared/utils/helpers';

import { AdminService } from './providers/Admin.service';
import { CreateAdminDto, LoginUserDto } from './providers/dtos/admin-request.dto';
import { UserResponseDto } from './providers/dtos/admin-response.dto';
import { AdminJwtStrategy, UserJwtStrategy } from '@shared/auth/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';
import { EAuthGuard } from '@constants/auth.constant';

@Controller('')
@ApiTags('User')
export class AdminController {
    constructor(private adminService: AdminService, private authService: AuthService) {}

    @Post('/admin/auth')
    @UsePipes(SignatureValidationPipe)
    @ApiOkResponse({ type: UserResponseDto })
    async handleAdminLogin(@Body() body: LoginUserDto) {
        const user = await this.adminService.findOne({ wallet_address: body.wallet_address });
        if (!user) {
            throw new HttpException('Admin not found!', HttpStatus.NOT_FOUND);
        }
        const response = { ...user, token: null };
        response.token = await this.authService.signAdminJwt(response);

        return formatReponseSuccess(response);
    }

    @Post('/admin')
    @Roles([EUserRole.SUPER_ADMIN, EUserRole.ADMIN])
    @ApiOkResponse({ type: UserResponseDto })
    async handleCreateAdmin(@Body() body: CreateAdminDto) {
        return 'create admin ok';
    }
    @Put('/admin/:id')
    @ApiOkResponse({ type: UserResponseDto })
    handleUpdateAdmin() {
        return 'edit admin ok';
    }

    @UseGuards(AuthGuard(EAuthGuard.ADMIN_GUARD))
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

    @Put('/admin/profile/:id')
    @ApiOkResponse({ type: UserResponseDto })
    handleUpdateProfile() {
        return 'update profile ok';
    }
}
