import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Budget from './Budget';
import Product from './Product';

@Entity('budgets_products')
export default class BudgetProduct {
  @Column('uuid')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_id: string;

  @Column()
  budget_id: string;

  @Column('decimal', { precision: 11, scale: 2 })
  tax_amount: number;

  @Column('decimal', { precision: 11, scale: 2 })
  tax_free_amount: number;

  @Column('decimal', { precision: 11, scale: 2 })
  value_for_partners: number;

  @ManyToOne(() => Product, (client) => client.id, {
    eager: true,
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Budget, (budget) => budget.id, {
    eager: true,
  })
  @JoinColumn({ name: 'budget_id' })
  budget: Budget;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
