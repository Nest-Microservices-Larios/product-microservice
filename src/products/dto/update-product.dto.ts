import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsPositive } from 'class-validator';

//esta extension lo que hace es que todo lo que tengo en la creacion de producto, sea opcional
export class UpdateProductDto extends PartialType(CreateProductDto) {

   @IsNumber()
   @IsPositive()
   id:number; 
}
