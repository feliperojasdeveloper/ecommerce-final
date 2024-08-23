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
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [typeormConfig],
  }), TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => configService.get('typeorm')
  }), UsersModule, ProductsModule, AuthModule, OrdersModule, OrderDetailsModule, CategoriesModule],
  controllers: [UsersController, ProductsController, AuthController],
  providers: [UsersService, ProductsService, AuthService],
})
export class AppModule { }
