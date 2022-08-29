import { EUserRole } from "@constants/user.constant";
import { SetMetadata } from "@nestjs/common";



export const Roles = (role:EUserRole[]) => SetMetadata('role', role);
