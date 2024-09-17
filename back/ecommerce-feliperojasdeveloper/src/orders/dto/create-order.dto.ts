import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Product } from "../../products/entities/product.entity";

export class CreateOrderDto {

    @ApiProperty({
        description: 'ID of the user making the order',
        example: 'c2d5bf2e-7da5-42b5-a56f-02a737cfde94',
    })
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({
        description: 'Array of products included in the order',
        example: [
            {
                id: '4f8b8c62-e624-42b5-8103-6bb7a3e12153',
                name: 'Laptop',
                price: 999.99,
                quantity: 1,
            },
            {
                id: '5a9d7b7b-ec0d-4811-8bb2-b9b1b75cb631',
                name: 'Mouse',
                price: 49.99,
                quantity: 2,
            }
        ],
        isArray: true,
        minItems: 1,
    })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    products: Partial<Product[]>;
}
