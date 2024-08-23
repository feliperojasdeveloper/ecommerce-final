import { Injectable } from "@nestjs/common";
import * as data from '../utils/data.json';
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryRepository {

    constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>) { }

    async getCategories() {
        return await this.categoriesRepository.find();
    }

    async addCategories() {
        for (const element of data){
            const categoryExist = await this.categoriesRepository.findOne({
                where: {name: element.category}
            });
            if(!categoryExist){
                const newCategory = this.categoriesRepository.create({name: element.category});
                await this.categoriesRepository.save(newCategory);
            }
        }
        return "Categorias agregadas";
    }

}