import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() order: CreateOrderDto) {
    try {
      const newOrder = this.ordersService.addOrder(order);
      if (!newOrder) {
        throw new HttpException('No se pudo crear la orden', HttpStatus.BAD_REQUEST);
      }
      return newOrder;
    } catch (error) {
      throw new HttpException('Error al crear la orden', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  getOrder(@Query('id') id: string) {
    try {
      const order = this.ordersService.getOrder(id);
      if (!order) {
        throw new HttpException('Orden no encontrada', HttpStatus.NOT_FOUND);
      }
      return order;
    } catch (error) {
      throw new HttpException('Error al obtener la orden', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
