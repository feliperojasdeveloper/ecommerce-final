import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrdersService {

  constructor(private orderRepository: OrderRepository) { }

  addOrder(product: CreateOrderDto) {
    const {userId, products} = product;
    return this.orderRepository.addOrder(userId, products);
  }

  getOrder(id: string) {
    return this.orderRepository.getOrder( id );
  }
}
