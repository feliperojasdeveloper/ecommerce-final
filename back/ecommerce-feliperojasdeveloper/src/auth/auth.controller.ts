import { BadRequestException, Body, Controller, HttpException, HttpStatus, Inject, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { validateUser } from "../utils/validate";
import { CreateUserDto } from "../users/dto/create-user.dto";



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('signin')
    signIn(@Body() loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        return this.authService.signIn(email, password);
    }

    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto ) {
        if (validateUser(createUserDto)) {
            const { password, confirmpassword } = createUserDto;
            if (password !== confirmpassword) {
                throw new BadRequestException("Las contraseñas no coinciden");
            }
            return await this.authService.signUp(createUserDto);
        }
        throw new BadRequestException("Error en los datos de creación del usuario");
    }
}