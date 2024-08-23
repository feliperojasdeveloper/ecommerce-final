import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    getUsers(page: number, limit: number) {
        return this.userRepository.getUsers(page, limit);
    }

    getUserById(id: string) {
        return this.userRepository.getUserById(id);
    }

    createUser(createdUser: User) {
        return this.userRepository.createUser(createdUser);
    }

    // updateUser(id: number, updatedUser: Partial<User>) {
    //     return this.userRepository.update(id, updatedUser);
    // }

    // deleteUser(id: number) {
    //     return this.userRepository.delete(id);
    // }
}