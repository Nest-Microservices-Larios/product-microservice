import { Type } from "class-transformer";
import { IsNumber, isNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {

    @IsString()
    public name: string;

    @IsNumber({
        maxDecimalPlaces: 2,
    })
    @Min(0)
    @Type(() => Number)
    @IsPositive()
    public price: number;


}
