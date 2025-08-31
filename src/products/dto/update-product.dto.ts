import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

//esta extension lo que hace es que todo lo que tengo en la creacion de producto, sea opcional
export class UpdateProductDto extends PartialType(CreateProductDto) {}
