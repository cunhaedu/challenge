import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableBudgetProducts1604954311479 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'budgets_products',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          default: 'uuid_generate_v4()',
          isPrimary: true,
          generationStrategy: 'uuid',
        },
        {
          name: 'budget_id',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'product_id',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'tax_free_amount',
          type: 'decimal',
          scale: 2,
          precision: 11,
          isNullable: false,
        },
        {
          name: 'tax_amount',
          type: 'decimal',
          scale: 2,
          precision: 11,
          isNullable: false,
        },
        {
          name: 'value_for_partners',
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
      foreignKeys: [
        {
          name: 'BudgetProductBudget',
          columnNames: ['budget_id'],
          referencedTableName: 'budgets',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        {
          name: 'BudgetProductProduct',
          columnNames: ['product_id'],
          referencedTableName: 'products',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('budgets_products');
  }
}
