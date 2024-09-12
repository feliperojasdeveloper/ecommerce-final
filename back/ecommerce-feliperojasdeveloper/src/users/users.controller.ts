import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { validateUser } from "../utils/validate";
import { AuthGuard } from "../auth/guards/auth.guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { Roles } from "../decorators/roles/roles.decorator";
import { Role } from "./enum/roles.enum";
import { RolesGuard } from "../auth/guards/roles.guard";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    async getUsers(@Query('page') page: number, @Query('limit') limit: number) {
        try {
            if (page && limit) {                
                const users = await this.usersService.getUsers(page, limit);
                return users;

            }
            const users = await this.usersService.getUsers(page, limit);
            return users;
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
            return user;
        } catch (error) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
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