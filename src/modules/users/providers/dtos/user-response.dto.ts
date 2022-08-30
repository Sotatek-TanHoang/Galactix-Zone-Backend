import { ApiProperty } from '@nestjs/swagger';

import { BaseReponseDto } from '@core/base-response.dto';

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
    status: string;

    @ApiProperty()
    created_at: string;

    @ApiProperty()
    updated_at: string;

    @ApiProperty()
    token: string;
}
