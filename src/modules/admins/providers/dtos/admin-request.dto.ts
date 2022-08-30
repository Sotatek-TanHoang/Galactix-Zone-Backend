import { IsEmail, IsEmpty, IsEnum, isNotEmpty, IsNotEmpty, IsOptional } from 'class-validator';

import { EUserRole } from '@constants/user.constant';

import { BasePaginationWithSortRequestDto } from '@core/base-request.dto';

export class UserRequestDto extends BasePaginationWithSortRequestDto {
    id?: number;
    wallet_address?: string;
    query?: string;
    role?: string;
    status?: string;
}

export class LoginUserDto {
    @IsNotEmpty()
    wallet_address: string;
    @IsNotEmpty()
    signature: string;
    @IsNotEmpty()
    sign_message: string;

    // others
    @IsEmail()
    @IsOptional()
    email?: string;
    @IsOptional()
    username?: string;
}

export class CreateUserDto extends LoginUserDto {
    role?: string;
}

export class CreateAdminDto {
    @IsNotEmpty()
    wallet_address: string;

    @IsOptional()
    username: string;
    @IsOptional()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsEnum(EUserRole)
    role: string;
}

export class UpdateAdminDto extends CreateAdminDto {}
