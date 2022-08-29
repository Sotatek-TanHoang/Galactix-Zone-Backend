import { BasePaginationWithSortRequestDto } from '@core/base-request.dto';

export class UserRequestDto extends BasePaginationWithSortRequestDto {
    id?: number;
    hash?: string;
    number?: number;
}
