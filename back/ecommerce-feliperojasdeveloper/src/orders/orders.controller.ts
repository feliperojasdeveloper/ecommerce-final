import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  addOrder(@Body() order: CreateOrderDto) {    
    return this.ordersService.addOrder(order);
  }

  @Get(':id')
  getOrder(@Query('id') id: string) {
    return this.ordersService.getOrder(id);
  }

}
