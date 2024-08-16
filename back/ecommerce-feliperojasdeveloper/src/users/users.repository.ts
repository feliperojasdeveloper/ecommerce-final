import { User } from "./entities/user.entity";

export class UserRepository {
    private users: User[] = [];

    findAll(): User[]{
        return this.users;
    }

    save(newUser: User): void{
        this.users.push(newUser);
    } 
}