import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from 'src/users/users.module';
import { OrderRepository } from './order.repository';
import { User } from 'src/users/entities/user.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, OrderDetail, Product]), UsersModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
})
export class OrdersModule {}
