export class CreateOrderDto {
  orderId: number;
  customerId: number;
  orderDate: string;
  details: CreateOrderDetailDto[];
}

export class CreateOrderDetailDto {
  orderId: number;
  rowNumber: number;
  productId: number;
  quantity: number;
  pricePerUnit: number;
}
