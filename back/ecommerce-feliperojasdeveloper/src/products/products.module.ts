import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { CategoriesModule } from "src/categories/categories.module";
import { ProductRepository } from "./products.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Product]), CategoriesModule],
    providers: [ProductsService, ProductRepository],
    controllers: [ProductsController],
    exports: [ProductsService, ProductRepository]
})
export class ProductsModule {

}