import { Body, Controller, Delete, Get, Param, Post, Put, Res, HttpStatus, HttpCode, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./entities/product.entity";
import { Response } from "express";
import { validateProduct } from "src/utils/validate";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    getProducts(@Query('page') page: number, @Query('limit') limit: number) {
        return this.productsService.getProducts(page, limit);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getProductById(@Param('id') id: string) {
        return this.productsService.getProductById(Number(id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(AuthGuard)
    createProduct(@Body() productCreated: Product) {
        if (validateProduct(productCreated)) {
            const product = this.productsService.create(productCreated);
            return product.id
        }
        return "El producto no pudo ser creado";
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    updateProduct(@Param('id') id: string, @Body() updatedProduct: Partial<Product>) {
        if (validateProduct(updatedProduct)) {
            this.productsService.updateProduct(Number(id), updatedProduct);
            return id;
        }
        return "El producto no pudo ser actualizado";
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(Number(id));
    }
}