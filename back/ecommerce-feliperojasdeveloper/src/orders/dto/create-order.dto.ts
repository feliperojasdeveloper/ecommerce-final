import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { CreateProductDto } from "src/products/dto/create-product.dto";
import { ProductDto } from "src/products/dto/product.dto";
import { Product } from "src/products/entities/product.entity";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    products: Partial<Product[]>;
}
