import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {

  constructor(@InjectRepository(Order) private ordersRepository: Repository<Order>){}

  addOrder(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  getOrder() {
    return `This action returns all orders`;
  }
}
