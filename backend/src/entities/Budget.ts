import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import BudgetProduct from './BudgetProducts';
import Client from './Client';

@Entity('budgets')
export default class Budget {
  @Column('uuid')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sale_type: string;

  @Column()
  client_id: string;

  @Column('integer')
  users_quantity: number;

  @Column('integer')
  taxes: number;

  @Column('integer')
  commission: number;

  @Column('decimal', { precision: 11, scale: 2 })
  amount: number;

  @ManyToOne(() => Client, (client) => client.id)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @OneToMany(() => BudgetProduct, (budgetProduct) => budgetProduct.budget, {
    cascade: ['insert', 'update'],
  })
  budgetProducts: BudgetProduct[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
