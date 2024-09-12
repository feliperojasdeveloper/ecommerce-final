import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { Product } from "../../products/entities/product.entity";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    products: Partial<Product[]>;
}
