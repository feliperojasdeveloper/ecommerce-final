import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUUID, IsUrl, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

    @ApiProperty({
        description: 'Unique identifier for the product, assigned by the system',
        example: 'c2d5bf2e-7da5-42b5-a56f-02a737cfde94',
        readOnly: true,
    })
    @IsUUID()
    @IsOptional()
    id?: string;

    @ApiProperty({
        description: 'Name of the product',
        example: 'Laptop',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Detailed description of the product',
        example: 'A powerful laptop with 16GB RAM and 512GB SSD.',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Price of the product',
        example: 999.99,
    })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({
        description: 'Stock available for the product',
        example: 100,
    })
    @IsNumber()
    @Min(0) 
    stock: number;

    @ApiProperty({
        description: 'Optional image URL of the product',
        example: 'https://example.com/product.jpg',
        required: false,
    })
    @IsOptional()
    @IsUrl()
    imgUrl?: string;
    
}
