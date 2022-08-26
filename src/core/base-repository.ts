import { Repository, SelectQueryBuilder } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

import { IPagination } from '@shared/interfaces/pagination.interface';

export abstract class BaseRepository<E> extends Repository<E> {
    protected abstract alias: ETableName;

    protected createQb() {
        return this.createQueryBuilder(this.alias);
    }

    protected queryBuilderAddPagination(
        queryBuilder: SelectQueryBuilder<E>,
        data: Partial<IPagination>,
        selections?: string[],
    ): SelectQueryBuilder<E> {
        if (typeof data != 'object') return queryBuilder;
        if (data.limit) queryBuilder.limit(data.limit);
        if (data.page) queryBuilder.offset((data.page - 1) * data.limit);
        if (data.sortBy) {
            if (!selections || (selections && selections.includes(`${this.alias}.${data.sortBy}`))) {
                queryBuilder.orderBy(`${this.alias}.${data.sortBy}`, data.direction || 'ASC');
            }
        }

        return queryBuilder;
    }

    protected queryBuilderAddGroupBy(queryBuilder: SelectQueryBuilder<E>, fields: string[]): SelectQueryBuilder<E> {
        fields.forEach((field, index) => {
            if (index === 0) queryBuilder.groupBy(field);
            else queryBuilder.addGroupBy(field);
        });
        return queryBuilder;
    }
}
