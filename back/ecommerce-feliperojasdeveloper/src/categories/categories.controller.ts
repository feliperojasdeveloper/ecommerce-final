import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get('seeder')
  addCategories() {
    return this.categoriesService.addCategories();
  }

  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
