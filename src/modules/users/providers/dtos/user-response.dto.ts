import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    wallet_address: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    status: number;

    @ApiProperty()
    created_at: string;

    @ApiProperty()
    updated_at: string;
}
