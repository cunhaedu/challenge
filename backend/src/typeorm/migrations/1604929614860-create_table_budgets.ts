import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableBudgets1604929614860 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'budgets',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          default: 'uuid_generate_v4()',
          isPrimary: true,
          generationStrategy: 'uuid',
        },
        {
          name: 'client_id',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'sale_type',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'users_quantity',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'taxes',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'commission',
          type: 'integer',
          isNullable: false,
        },
        {
          name: 'amount',
          type: 'decimal',
          scale: 2,
          precision: 14,
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
      foreignKeys: [
        {
          name: 'BudgetClient',
          columnNames: ['client_id'],
          referencedTableName: 'clients',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
