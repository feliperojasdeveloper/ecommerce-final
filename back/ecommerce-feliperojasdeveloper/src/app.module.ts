import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { ProductsController } from './products/products.controller';
import { AuthController } from './auth/auth.controller';
import { UsersService } from './users/users.service';
import { ProductsService } from './products/products.service';
import { AuthService } from './auth/auth.service';
import { UserRepository } from './users/users.repository';
import { ProductRepository } from './products/products.repository';

@Module({
  imports: [UsersModule, ProductsModule, AuthModule],
  controllers: [UsersController, ProductsController, AuthController],
  providers: [UsersService, ProductsService, AuthService, UserRepository, ProductRepository],
})
export class AppModule {}
