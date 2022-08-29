import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

export class createBlockTable1650872194081 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: ETableName.USER,
                columns: [
                    {
                        name: 'id',
                        type: 'character varying',
                        length: '50',
                        isPrimary: true,
                        
                    },
                    {
                        name: 'wallet_address',
                        type: 'character varying',
                        length: '42',
                        isUnique:true
                    },
                    {
                        name: 'username',
                        type: 'character varying',
                        isNullable:true
                    },
                    {
                        name: 'email',
                        type: 'character varying',
                        isNullable:true
                    },
                    {
                        name: 'status',
                        type: 'character varying',
                    },
                    {
                        name: 'role',
                        type: 'character varying',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp without time zone',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp without time zone',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(ETableName.USER);
    }
}
