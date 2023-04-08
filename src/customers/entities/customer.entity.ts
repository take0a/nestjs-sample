import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryColumn({ name: 'customer_id' })
  customerId: number;

  @Column()
  name: string;

  @Column()
  address: string;
}
