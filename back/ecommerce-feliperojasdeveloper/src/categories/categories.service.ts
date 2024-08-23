import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoryRepository) { }

  addCategories() {
    return this.categoryRepository.addCategories();
  }

  getCategories() {
    return this.categoryRepository.getCategories();
  }
}
