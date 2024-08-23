import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    // @Post('signIn')
    // signIn(@Body('email') email: string, @Body('password') password: string) {
    //     if(!email || !password){
    //         return "Email o Password son requeridos";
    //     }
    //     return this.authService.signIn(email, password);
    // }
}