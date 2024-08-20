import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/users/users.repository";

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository){}
    signIn(email: string, password: string): string {
        const user = this.userRepository.findByEmail(email);
        if(!user || user?.password !== password) {
            return "Email o Password incorrecto";
        }
        return "Login exitoso";
    }
}