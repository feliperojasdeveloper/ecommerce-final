import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "../users/users.repository";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/dto/create-user.dto";


@Injectable()
export class AuthService {
    constructor(private userRepository: UserRepository, private readonly jwtService: JwtService) { }

    async signIn(email: string, password: string) {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new BadRequestException("Email o Password incorrecto");
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            throw new BadRequestException("Email o Password incorrecto");
        }
        const userPayload = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        }
        const token = this.jwtService.sign(userPayload);

        return { success: "Usuario logueado correctamente", token };
    }

    async signUp(createUserDto: CreateUserDto) {
        const user = await this.userRepository.getUserByEmail(createUserDto.email);
        if (!user) {
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            if (!hashedPassword) {
                throw new BadRequestException("El password no pudo ser hasheado");
            }
            const createdUser = await this.userRepository.createUser({ ...createUserDto, password: hashedPassword });
            const {password, ...userWhitOutPassword} = createdUser;
            return userWhitOutPassword ;
        }
        throw new BadRequestException('El usuario ya existe');
    }
}