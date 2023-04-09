import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'order_header' })
export class Order {
  @PrimaryColumn({ name: 'order_id' })
  orderId: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'order_date' })
  orderDate: string;

  @OneToMany(() => OrderDetail, (detail) => detail.header, {
    eager: true,
    cascade: true,
  })
  details: OrderDetail[];
}

@Entity({ name: 'order_detail' })
export class OrderDetail {
  @PrimaryColumn({ name: 'order_id' })
  orderId: number;

  @PrimaryColumn({ name: 'row_number' })
  rowNumber: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column()
  quantity: number;

  @Column({ name: 'price_per_unit' })
  pricePerUnit: number;

  @ManyToOne(() => Order, (header) => header.details)
  @JoinColumn({ name: 'order_id' })
  header?: Order;
}
