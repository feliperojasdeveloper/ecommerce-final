import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async getUsers(page: number = 1, limit: number = 5): Promise<User[]> {
        const startIndex = (page - 1) * limit;
        const end = startIndex + +limit;
        const users = await this.userRepository.find();
        return users.slice(startIndex, startIndex + limit);
    }

    async getUserById(id: string): Promise<User> {
        return await this.userRepository.findOne({ 
            where: {id},
            relations: ['orders'] 
        });
    }

    async createUser(user: User) {
        const newUser = await this.userRepository.create(user);
        const userBd = await this.userRepository.save(newUser);
        return userBd;
    }

    // findByEmail(email: string): User | undefined {
    //     return this.users.find((user)=> user.email === email);
    // }

    // save(newUser: Omit<User, 'id'>): User {
    //     const id = this.users.length + 1;
    //     this.users = [...this.users, { id, ...newUser }];
    //     return { id, ...newUser };
    // }

    // update(id: number, updatedUser: Partial<User>): User {
    //     const userIndex = this.users.findIndex((user) => user.id === id);
    //     if (userIndex === -1) {
    //         throw new Error('Usuario no encontrado');
    //     }
    //     const user = this.users[userIndex];
    //     this.users[userIndex] = { ...user, ...updatedUser };
    //     return this.users[userIndex];
    // }

    // delete(id: number): number {
    //     const userIndex = this.users.findIndex((user) => user.id === id);
    //     if (userIndex === -1) {
    //         throw new Error('Usuario no encontrado');
    //     }
    //     this.users.splice(userIndex, 1);
    //     return id;
    // }
}