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

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where: { email }
        });
    }

    async getUserById(id: string): Promise<User> {
        return await this.userRepository.findOne({
            where: { id },
            relations: ['orders']
        });
    }

    async createUser(user: Partial<User>) {
        const newUser = await this.userRepository.create(user);
        const userBd = await this.userRepository.save(newUser);
        return userBd;
    }

    async update(id: string, updatedUser: Partial<User>): Promise<User> {
        const userId = await this.userRepository.findOne({
            where: {id}
        })
        if (!userId) {
            throw new Error('Usuario no encontrado');
        }  
        const userUpdated = await this.userRepository.update(id, updatedUser);
        console.log(userUpdated);
        return userId;
    }


    // delete(id: number): number {
    //     const userIndex = this.users.findIndex((user) => user.id === id);
    //     if (userIndex === -1) {
    //         throw new Error('Usuario no encontrado');
    //     }
    //     this.users.splice(userIndex, 1);
    //     return id;
    // }
}