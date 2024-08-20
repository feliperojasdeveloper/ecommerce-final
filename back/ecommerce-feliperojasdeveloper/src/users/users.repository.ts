import { User } from "./entities/user.entity";

export class UserRepository {
    private users: User[] = [];

    findAll(page: number = 1, limit: number = 5): User[] {
        const startIndex = (page - 1) * limit;
        return this.users.slice(startIndex, startIndex + limit);
    }

    findById(id: number): User {
        return this.users.find((user) => user.id === id);
    }

    findByEmail(email: string): User | undefined {
        return this.users.find((user)=> user.email === email);
    }

    save(newUser: Omit<User, 'id'>): User {
        const id = this.users.length + 1;
        this.users = [...this.users, { id, ...newUser }];
        return { id, ...newUser };
    }

    update(id: number, updatedUser: Partial<User>): User {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            throw new Error('Usuario no encontrado');
        }
        const user = this.users[userIndex];
        this.users[userIndex] = { ...user, ...updatedUser };
        return this.users[userIndex];
    }

    delete(id: number): number {
        const userIndex = this.users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            throw new Error('Usuario no encontrado');
        }
        this.users.splice(userIndex, 1);
        return id;
    }
}