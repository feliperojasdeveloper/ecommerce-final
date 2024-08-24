import { Body, Controller, Delete, Get, Param, Post, Put, Res, HttpStatus, HttpCode, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./entities/product.entity";
import { Response } from "express";
import { validateProduct } from "src/utils/validate";
import { AuthGuard } from "src/guards/auth.guard";
import * as data from '../utils/data.json'

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    getProducts(@Query('page') page: number, @Query('limit') limit: number) {
        if(page && limit){
            return this.productsService.getProducts(page, limit);
        }
        return this.productsService.getProducts(1,5);

    }

    @Get('seeder')
    addProducts(){
        return this.productsService.addProducts();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getProductById(@Param('id') id: string) {
        return this.productsService.getProductById(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    updateProduct(@Param('id') id: string, @Body() updatedProduct: Partial<Product>) {
        if (validateProduct(updatedProduct)) {
            this.productsService.updateProduct(id, updatedProduct);
            return id;
        }
        return "El producto no pudo ser actualizado";
    }
}