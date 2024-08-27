import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUUID, IsUrl, Min } from 'class-validator';
export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @Min(0) // Valor mínimo permitido para el precio
    price: number;

    @IsNumber()
    @Min(0) // Valor mínimo permitido para el stock
    stock: number;

    @IsOptional() // La URL de la imagen es opcional
    @IsUrl()
    imgUrl?: string;
}