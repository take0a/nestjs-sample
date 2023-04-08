import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsRepository.save(createProductDto).catch((e) => {
      throw new InternalServerErrorException(e.message);
    });
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find().catch((e) => {
      throw new InternalServerErrorException(e.message);
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({
      productId: id,
    });
    if (!product) {
      throw new NotFoundException(`Product not found (${id})`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productsRepository
      .update({ productId: id }, updateProductDto)
      .catch((e) => {
        throw new InternalServerErrorException(e.message);
      });
    const product = await this.productsRepository.findOneBy({
      productId: id,
    });
    if (!product) {
      throw new NotFoundException(`Product not found (${id})`);
    }
    return product;
  }

  async remove(id: number): Promise<DeleteResult> {
    const result = await this.productsRepository
      .delete({ productId: id })
      .catch((e) => {
        throw new InternalServerErrorException(e.message);
      });
    if (!result.affected) {
      throw new NotFoundException(`Product not found (${id})`);
    }
    return result;
  }
}
