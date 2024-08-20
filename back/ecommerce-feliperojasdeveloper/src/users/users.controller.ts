import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { validateUser } from "src/utils/validate";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)   
    getUsers(@Query('page') page: number, @Query('limit') limit: number) {
        return this.usersService.getUsers(page, limit);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)  
    getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(Number(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() userCreated: User) {
        if (validateUser(userCreated)) {
            const user = this.usersService.create(userCreated)
            return user.id;
        }
        return "El usuario no pudo ser creado";
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)  
    updateUser(@Param('id') id: string, @Body() updatedUser: Partial<User>) {
        if (validateUser(updatedUser)) {
            this.usersService.updateUser(Number(id), updatedUser);
            return id;
        }
        return "No se pudo actualizar el usuario";
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)  
    deleteUser(@Param('id') id: string) {
        this.usersService.deleteUser(Number(id));
        return id;
    }

}