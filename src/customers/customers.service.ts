import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return await this.customersRepository.save(createCustomerDto).catch((e) => {
      throw new InternalServerErrorException(e.message);
    });
  }

  async findAll(): Promise<Customer[]> {
    return await this.customersRepository.find().catch((e) => {
      throw new InternalServerErrorException(e.message);
    });
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customersRepository.findOneBy({
      customerId: id,
    });
    if (!customer) {
      throw new NotFoundException(`Customer not found (${id})`);
    }
    return customer;
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    await this.customersRepository
      .update({ customerId: id }, updateCustomerDto)
      .catch((e) => {
        throw new InternalServerErrorException(e.message);
      });
    const customer = await this.customersRepository.findOneBy({
      customerId: id,
    });
    if (!customer) {
      throw new NotFoundException(`Customer not found (${id})`);
    }
    return customer;
  }

  async remove(id: number): Promise<DeleteResult> {
    const result = await this.customersRepository
      .delete({ customerId: id })
      .catch((e) => {
        throw new InternalServerErrorException(e.message);
      });
    if (!result.affected) {
      throw new NotFoundException(`Customer not found (${id})`);
    }
    return result;
  }
}
