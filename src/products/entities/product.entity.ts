import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryColumn({ name: 'product_id' })
  productId: number;

  @Column()
  name: string;

  @Column({ name: 'price_per_unit' })
  pricePerUnit: number;
}
