import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('products-service');

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }

  create(createProductDto: CreateProductDto) {

    return this.product.create({
      data: createProductDto
    });

  }

  async findAll(paginationDto: PaginationDto) {

    const { page = 1, limit = 10 } = paginationDto;

    const totalPages = await this.product.count();

    const lastPage = Math.ceil(totalPages / limit);

    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit
      }),
      meta: {
        totalPages,
        currentPage: page,
        pageSize: limit,
        lastPage:lastPage
      }
    }
  }

  async findOne(id: number) {

     const product = await this.product.findFirst({
        where: { id }
      });

      if (!product) {
        throw new NotFoundException(`Product with id #${id} not found`);
      }

      return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
