import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableCompanies1604590782506 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(new Table({
      name: 'companies',
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
          name: 'fantasy_name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'cnpj',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'neighborhood',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'company_size',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'contact_email',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'email',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'cep',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'city',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'state',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'number_of_employees',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'contact_phone',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'commercial_phone',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'address',
          type: 'varchar',
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
    await queryRunner.dropTable('companies');
  }
}
