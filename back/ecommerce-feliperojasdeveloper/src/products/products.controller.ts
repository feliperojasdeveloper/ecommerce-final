import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./entities/product.entity";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    @Get()
    getProducts() {
        return this.productsService.getProducts();
    }

    @Post()
    createProduct(@Body() productCreated: Product){
        return this.productsService.create(productCreated);
    }
}