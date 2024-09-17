import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {

    @ApiProperty({
        description: 'Email address of the user',
        example: 'user@example.com',
    })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'Password for the user account',
        example: 'securePassword123!',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
