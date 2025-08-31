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

  async update(id: number, updateProductDto: UpdateProductDto) {

    //aqui si bien es cierto hacemos una doble peticion a la bd puede consumir mas recursos, otra forma de hacerlo es manejar la excepcion y leer el error y retornarlo
    
    await this.findOne(id);

    return this.product.update({
      where: { id },
      data: updateProductDto
    });

  }

  async remove(id: number) {

    await this.findOne(id);

    return this.product.delete({
      where: { id }
    });
  }
}
