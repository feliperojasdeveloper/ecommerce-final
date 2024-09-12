import { InjectRepository } from '@nestjs/typeorm';
import * as data from '../utils/data.json';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../categories/categories.repository';

@Injectable()
export class ProductRepository {
    constructor( @InjectRepository(Product) private productsRepository: Repository<Product>, private categoriesRepository: CategoryRepository){}

    async getProducts(page: number, limit: number): Promise<Product[]>{
        const products = await this.productsRepository.find({
            relations: {
                category: true
            }
        });

        let inStock = products.filter((product) => product.stock > 0);

        const start = (page-1) * limit;
        const end = start + +limit;

        inStock = inStock.slice(start, end);

        return inStock;
    }

    async getProductById(id: string){
        const product = this.productsRepository.findOneBy({id});
        return product;
    }

    async addProducts(){
        const categories = await this.categoriesRepository.getCategories();

        data?.map(async (element) => {
            const category = categories.find(
                (category) => category.name === element.category,
            );

            const product = new Product();
            product.name = element.name;
            product.description = element.description;
            product.price = element.price;
            product.stock = element.stock;
            product.category = category;

            await this.productsRepository
            .createQueryBuilder()
            .insert()
            .into(Product)
            .values(product)
            .orUpdate(['description', 'price', 'stock'], ['name'])
            .execute();
        });
        return 'Productos agregados';
    }

    async updateProduct(id: string, product: Partial<Product>){
        const updatedProductId = await this.productsRepository.findOneBy({id});
        if(!updatedProductId) {
            throw new Error('Usuario no encontrado');
        }
        await this.productsRepository.update(id, product);
        return updatedProductId;
    }
}