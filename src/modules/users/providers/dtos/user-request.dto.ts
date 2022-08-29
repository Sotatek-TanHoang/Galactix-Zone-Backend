import { BasePaginationWithSortRequestDto } from '@core/base-request.dto';

export class UserRequestDto extends BasePaginationWithSortRequestDto {
    id?: number;
    wallet_address?: string;
    query?: string;
    role?:string;
    status?:string;
}
