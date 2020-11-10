import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import BudgetProduct from './BudgetProducts';

@Entity('products')
export default class Product {
  @Column('uuid')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 11, scale: 2 })
  little_size_base: number;

  @Column('decimal', { precision: 11, scale: 2 })
  middle_size_base: number;

  @Column('decimal', { precision: 11, scale: 2 })
  large_size_base: number;

  @OneToMany(() => BudgetProduct, (budgetProduct) => budgetProduct.product, {
    cascade: ['insert', 'update'],
  })
  budgetProducts: BudgetProduct[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
