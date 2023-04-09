import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.ordersRepository.save(createOrderDto).catch((e) => {
      throw new InternalServerErrorException(e.message);
    });
  }

  async findAll(): Promise<Order[]> {
    return await this.ordersRepository.find({}).catch((e) => {
      throw new InternalServerErrorException(e.message);
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({
      orderId: id,
    });
    if (!order) {
      throw new NotFoundException(`Order not found (${id})`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    return await this.ordersRepository.save(updateOrderDto).catch((e) => {
      throw new InternalServerErrorException(e.message);
    });
  }

  async remove(id: number): Promise<void> {
    const order = await this.ordersRepository.findOneBy({
      orderId: id,
    });
    if (!order) {
      throw new NotFoundException(`Order not found (${id})`);
    }
    await this.ordersRepository.remove([order]);
    return;
  }
}
