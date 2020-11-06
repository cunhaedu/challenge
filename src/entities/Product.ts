import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export default class Product {
  @Column('uuid')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 11, scale: 2 })
  little_size_base: string;

  @Column('decimal', { precision: 11, scale: 2 })
  middle_size_base: string;

  @Column('decimal', { precision: 11, scale: 2 })
  large_size_base: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
