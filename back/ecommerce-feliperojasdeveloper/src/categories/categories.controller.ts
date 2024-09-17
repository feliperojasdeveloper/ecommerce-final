import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categorias')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get('seeder')
  addCategories() {
    try {
      const result = this.categoriesService.addCategories();
      if (!result) {
        throw new HttpException('No se pudieron agregar las categorías', HttpStatus.BAD_REQUEST);
      }
      return result;
    } catch (error) {
      throw new HttpException('Error al agregar categorías', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  getCategories() {
    try {
      const categories = this.categoriesService.getCategories();
      if (!categories) {
        throw new HttpException('No se encontraron categorías', HttpStatus.NOT_FOUND);
      }
      return categories;
    } catch (error) {
      throw new HttpException('Error al obtener categorías', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
