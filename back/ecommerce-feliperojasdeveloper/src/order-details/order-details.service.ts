import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Injectable()
export class OrderDetailsService {
  create(createOrderDetailDto: CreateOrderDetailDto) {
    return 'This action adds a new orderDetail';
  }

  findAll() {
    return `This action returns all orderDetails`;
  }

  findOne(id: string) {
    return `This action returns a #${id} orderDetail`;
  }

  update(id: string, updateOrderDetailDto: UpdateOrderDetailDto) {
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: string) {
    return `This action removes a #${id} orderDetail`;
  }
}
