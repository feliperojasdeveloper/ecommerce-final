import { Injectable } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) { }
    getUsers(page: number, limit: number) {
        return this.userRepository.findAll(page, limit).map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
    }

    getUserById(id: number) {
        const user = this.userRepository.findById(id);
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    create(createdUser: Omit<User, 'id'>) {
        return this.userRepository.save(createdUser);
    }

    updateUser(id: number, updatedUser: Partial<User>) {
        return this.userRepository.update(id, updatedUser);
    }

    deleteUser(id: number) {
        return this.userRepository.delete(id);
    }
}