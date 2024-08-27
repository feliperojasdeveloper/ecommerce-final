import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('signIn')
    signIn(@Body() loginUserDto: LoginUserDto) {
        const {email, password} = loginUserDto;
        return this.authService.signIn(email, password);
    }
}