import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableProducts1604671693379 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'products',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          default: 'uuid_generate_v4()',
          isPrimary: true,
          generationStrategy: 'uuid',
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'little_size_base',
          type: 'decimal',
          scale: 2,
          precision: 11,
          isNullable: false,
        },
        {
          name: 'middle_size_base',
          type: 'decimal',
          scale: 2,
          precision: 11,
          isNullable: false,
        },
        {
          name: 'large_size_base',
          type: 'decimal',
          scale: 2,
          precision: 11,
          isNullable: false,
        },
        {
          name: 'created_at',
          type: 'date',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'date',
          default: 'now()',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
