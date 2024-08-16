import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository){}
    getUsers(){
        return this.userRepository.findAll();
    }

    create(createdUser: User){
        try {
            this.userRepository.save(createdUser);
            return "Usuario creado"
        } catch (error) {
            return error;
        }
    }
}