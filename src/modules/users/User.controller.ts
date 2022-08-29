import { EUserRole } from '@constants/user.constant';
import { UserEntity } from '@entities/User.entity';
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

import { AuthService } from '@shared/auth/auth.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';
import { SignatureValidationPipe } from '@shared/pipes/signature.pipe';
import { formatReponseSuccess } from '@shared/utils/format';
import { Roles } from '@shared/utils/helpers';
import { AdminService } from './providers/Admin.service';


import { CreateAdminDto, CreateUserDto, LoginUserDto, UserRequestDto } from './providers/dtos/user-request.dto';
import { UserResponseDto } from './providers/dtos/user-response.dto';
import { UserService } from './providers/User.service';

@Controller('')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService,private adminService:AdminService, private authService: AuthService) {}

    @Post('user/auth')
    @ApiOkResponse({ type: UserResponseDto })
    @UsePipes(SignatureValidationPipe)
    async handleUserLogin(@Body() body: LoginUserDto) {
        try {
            let user:UserEntity;
            user = await this.userService.findOne({ wallet_address: body.wallet_address });

            if (!user) {
                const userData={...body} as CreateUserDto;
                userData.role=EUserRole.PUBLIC_USER;
                user = await this.userService.createOne(userData);
            }
            
            const response={...user,token:null};
            response.token=await this.authService.signJWT(response);
        
            return formatReponseSuccess(response);
        } catch (e) {
            throw new HttpException('login failed!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/admin/auth')
    @UsePipes(SignatureValidationPipe)
    @ApiOkResponse({ type: UserResponseDto })
    async handleAdminLogin(@Body() body: LoginUserDto) {
        let user:UserEntity;
        user = await this.adminService.findOne({wallet_address: body.wallet_address});
        if(!user){
            throw new HttpException("Admin not found!",HttpStatus.NOT_FOUND);
        }
        const response={...user,token:null};
        response.token=await this.authService.signJWT(response);
        
        return formatReponseSuccess(response);
    }

    @Post('/admin')
    @Roles([EUserRole.SUPER_ADMIN,EUserRole.ADMIN])
    @ApiOkResponse({ type: UserResponseDto })
    async handleCreateAdmin(@Body() body:CreateAdminDto) {
        return 'create admin ok';
    }
    @Put('/admin/:id')
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

    @Put('/profile/:id')
    @ApiOkResponse({ type: UserResponseDto })
    handleUpdateProfile() {
        return 'update profile ok';
    }

}
