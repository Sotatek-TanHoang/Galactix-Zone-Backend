import { SetMetadata } from '@nestjs/common';

import { EUserRole } from '@constants/user.constant';

export const Roles = (role: EUserRole[]) => SetMetadata('role', role);
