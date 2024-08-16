import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductRepository } from "./products.repository";

@Module({
    providers: [ProductsService, ProductRepository],
    controllers: [ProductsController]
})
export class ProductsModule {

}