import { EntityRepository } from 'typeorm';

import { ETableName } from '@constants/entity.constant';
import { EUserStatus } from '@constants/user.constant';

import { BaseRepository } from '@core/base-repository';

import { AdminEntity } from '@entities/Admin.entity';

import { CreateAdminDto, UserRequestDto } from './dtos/admin-request.dto';

@EntityRepository(AdminEntity)
export class AdminRepository extends BaseRepository<AdminEntity> {
    protected alias: ETableName = ETableName.USER;
    buildQueryBuilder(params: UserRequestDto) {
        const { id, wallet_address, query, status, role } = params;
        const qb = this.createQb();
        qb.select([
            `${this.alias}.id`,
            `${this.alias}.wallet_address`,
            `${this.alias}.username`,
            `${this.alias}.email`,
            `${this.alias}.role`,
            `${this.alias}.created_at`,
            `${this.alias}.updated_at`,
        ]);
        if (id) qb.where(`${this.alias}.id = :id`, { id });
        if (wallet_address) qb.where(`${this.alias}.wallet_address = :wallet_address`, { wallet_address });
        if (status) {
        }
        if (role) {
            qb.where(`${this.alias}.role = :role`, { role });
        }
        if (query) {
            const searchQuery = `%${query}%`;
            qb.where(`${this.alias}.username like :searchQuery`, { searchQuery })
                .orWhere(`${this.alias}.wallet_address like :searchQuery`, { searchQuery })
                .orWhere(`${this.alias}.email like :searchQuery`, { searchQuery });
        }

        return qb;
    }
    async getMany(options: UserRequestDto) {
        const qb = this.buildQueryBuilder(options);

        this.queryBuilderAddPagination(qb, options);
        return await qb.getManyAndCount();
    }

    async getOne(options: UserRequestDto) {
        const qb = this.buildQueryBuilder(options);
        return await qb.getOne();
    }
    async saveOne(data: CreateAdminDto) {
        const { wallet_address, email = '', username = '', role } = data;
        return await this.save({ wallet_address, email, username, role, status: EUserStatus.NORMAL });
    }
}
