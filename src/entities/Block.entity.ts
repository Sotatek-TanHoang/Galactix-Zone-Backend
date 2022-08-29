import { Column, Entity } from 'typeorm';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { IUserAttribute } from './attributes/User.interface';
import { ETableName } from '@constants/entity.constant';

@Entity(ETableName.USER)
export class UserEntity extends BaseEntityIncludeTime implements IUserAttribute {
    @Column({ name: 'wallet_address', type: 'character varying' })
    wallet_address: string;

    @Column({ name: 'email', type: 'character varying' })
    email: string;

    @Column({ name: 'username', type: 'character varying' })
    username: string;

    @Column({ name: 'status', type: 'character varying' })
    status: string;


    @Column({ name: 'role', type: 'character varying' })
    role: string;
}
