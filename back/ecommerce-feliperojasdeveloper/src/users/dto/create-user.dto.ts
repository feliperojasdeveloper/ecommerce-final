import { IsString, IsNotEmpty, Length, IsEmail, Matches, IsOptional, IsNumber, MinLength, MaxLength, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsStrongPassword({
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minLength: 8,
    })
    password: string;

    @IsString()
    confirmpassword: string;

    @IsNumber()
    phone: number;

    @IsOptional()
    @IsString()
    @Length(5, 20)
    country?: string;

    @IsOptional()
    @IsString()
    @Length(5, 20)
    city?: string;

    @IsString()
    @Length(3, 80)
    address: string;
}
