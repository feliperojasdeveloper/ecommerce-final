import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsEmail, Matches, IsOptional, IsNumber, MinLength, MaxLength, IsStrongPassword, IsEmpty } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 80)
    @ApiProperty({
        description: 'User name to create. Must be between 3 and 80 characters long',
        example: 'Felipe Alejandro Rojas Lopez'
    })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'User email, which will serve as the user when logging in, must be in the same format as the email.',
        example: 'user@email.com'
    })
    email: string;

    @IsString()
    @IsStrongPassword({
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minLength: 8,
    })
    @ApiProperty({
        description: 'User password, must have at least one uppercase letter, one number, one special character and a minimum length of 8 characters',
        example: 'FRojas2024*'
    })
    password: string;

    @IsString()
    @ApiProperty({
        description: 'Password confirmation, must be sent in the body of the request and must correspond with the password.',
        example: 'FRojas2024*'
    })
    confirmpassword: string;

    @IsNumber()
    @ApiProperty({
        description: 'Must be an integer number',
        example: '31345'
    })
    phone: number;

    @IsOptional()
    @IsString()
    @Length(5, 20)
    @ApiProperty({
        description: 'Country of user created, must be between 5 and 20 characters long',
        example: 'Colombia'
    })
    country?: string;

    @IsOptional()
    @IsString()
    @Length(5, 20)
    @ApiProperty({
        description: 'City of user created, must be between 5 and 20 characters long',
        example: 'Cali Co'
    })
    city?: string;

    @IsString()
    @Length(3, 80)
    @ApiProperty({
        description: 'Address of user created, must be between 3 and 80 characters long',
        example: 'Carrera 121 a # 42-16'
    })
    address: string;

    @IsEmpty()
    @ApiProperty({
        description: 'Assigned by default when creating the user, it should not be included in the body',
        default: false,
        readOnly: true
    })
    isAdmin?: boolean;
}
