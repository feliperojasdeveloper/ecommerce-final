import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { validateUser } from "src/utils/validate";
import { AuthGuard } from "src/guards/auth.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { Request } from "express";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async getUsers(@Query('page') page: number, @Query('limit') limit: number) {
        try {
            const users = await this.usersService.getUsers(page, limit);
            if (page && limit) {
                const userWithOutPassword = users.map(({ password, ...userWithOutPassword }) => userWithOutPassword);
                return userWithOutPassword;

            }
            const userWithOutPassword = users.map(({ password, ...userWithOutPassword }) => userWithOutPassword)
            return userWithOutPassword;
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Error al obtener usuarios"
            },
                500
            );
        }
    }

    getUserByEmail(@Param('email') email: string) {
        try {
            const user = this.usersService.getUserByEmail(email)
            if (!user) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw new HttpException('Error al obtener usuario por email', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async getUserById(@Param('id', ParseUUIDPipe) id: string) {
        try {
            const user = await this.usersService.getUserById(id);
            if (!user) {
                throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
            }
            const { password, ...userWhitOutPassword } = user;
            return userWhitOutPassword;
        } catch (error) {
            throw new HttpException('Error al obtener usuario por Id', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() userCreated: CreateUserDto) {
        try {
            if (validateUser(userCreated)) {
                const user = this.usersService.createUser(userCreated);
                if (!user) {
                    throw new HttpException('No se pudo crear el usuario', HttpStatus.BAD_REQUEST);
                }
                return user;
            }
            throw new HttpException('Datos de usuario inválidos', HttpStatus.BAD_REQUEST);
        } catch (error) {
            throw new HttpException('Error al crear usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() updatedUser: Partial<CreateUserDto>) {
        try {
            if (validateUser(updatedUser)) {
                const result = this.usersService.updateUser(id, updatedUser);
                if (!result) {
                    throw new HttpException('Usuario no encontrado o no se pudo actualizar', HttpStatus.NOT_FOUND);
                }
                return id;
            }
            throw new HttpException('Datos de usuario inválidos', HttpStatus.BAD_REQUEST);
        } catch (error) {
            throw new HttpException('Error al actualizar usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        try {
            const resultado = this.usersService.deleteUser(id);
            if (!resultado) {
                throw new HttpException('Usuario no encontrado o no se pudo eliminar', HttpStatus.NOT_FOUND);
            }
            return id;
        } catch (error) {
            throw new HttpException('Error al eliminar usuario', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}