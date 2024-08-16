import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Post()
    createUser(@Body() userCreated: User){
        return this.usersService.create(userCreated);
    }
}