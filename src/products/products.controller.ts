import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  //@Post()
  @MessagePattern({ cmd: 'CreateProduct' })
  create(@Payload() createProductDto: CreateProductDto) {
    //return createProductDto; 
    return this.productsService.create(createProductDto);
  }

  //@Get()
  @MessagePattern({ cmd: 'GetProducts' })
  findAll(@Payload() paginationDto: PaginationDto) {

    //return PaginationDto; 
    return this.productsService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern({ cmd: 'GetProductbyId' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(+id);
  }

  //@Patch(':id')
  @MessagePattern({ cmd: 'UpdateProduct' })
  update(
    // @Param('id', ParseIntPipe) id: number, 
    // @Body() updateProductDto: UpdateProductDto
    @Payload() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
    // return{
    //    id,updateProductDto
    // }

    //return this.productsService.update(+id, updateProductDto);
  }

  //@Delete(':id')
  @MessagePattern({ cmd: 'DeleteProduct' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
