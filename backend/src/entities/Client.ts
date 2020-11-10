import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import Budget from './Budget';

@Entity('clients')
export default class Client {
  @Column('uuid')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  fantasy_name: string;

  @Column()
  cnpj: string;

  @Column()
  neighborhood: string;

  @Column()
  size: string;

  @Column()
  contact_email: string;

  @Column()
  email: string;

  @Column()
  cep: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column('integer')
  number_of_employees: number;

  @Column()
  contact_phone: string;

  @Column()
  commercial_phone: string;

  @Column()
  address: string;

  @OneToMany(() => Budget, (budget) => budget.client, {
    cascade: ['insert', 'update'],
  })
  budgets: Budget[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
