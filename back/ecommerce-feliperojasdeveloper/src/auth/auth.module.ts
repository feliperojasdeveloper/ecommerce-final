import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { UserRepository } from "src/users/users.repository";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AuthService, UserRepository],
    controllers: [AuthController]
})
export class AuthModule {

}