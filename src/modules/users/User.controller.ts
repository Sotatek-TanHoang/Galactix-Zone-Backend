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



import { CreateAdminDto, CreateUserDto, LoginUserDto, UserRequestDto } from './providers/dtos/user-request.dto';
import { UserResponseDto } from './providers/dtos/user-response.dto';
import { UserService } from './providers/User.service';

@Controller('')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService, private authService: AuthService) {}

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

    @Put('/user/profile/:id')
    @ApiOkResponse({ type: UserResponseDto })
    handleUpdateProfile() {
        return 'update profile ok';
    }

}
