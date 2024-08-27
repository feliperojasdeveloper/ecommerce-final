import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/users/users.repository";

@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository) { }
    async signIn(email: string, password: string): Promise<string> {
        const user = await this.userRepository.getUserByEmail(email);
        console.log(user);
        if (!user || user.password !== password) {
            return "Email o Password incorrecto";
        }
        return "Login exitoso";
    }
}