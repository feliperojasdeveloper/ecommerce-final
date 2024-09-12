import { Body, Controller, Delete, Get, Param, Post, Put, Res, HttpStatus, HttpCode, Query, UseGuards, ParseUUIDPipe, HttpException } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { validateProduct } from "../utils/validate";
import { AuthGuard } from "../auth/guards/auth.guard";
import { CreateProductDto } from "./dto/create-product.dto";
import { Roles } from "../decorators/roles/roles.decorator";
import { Role } from "../users/enum/roles.enum";
import { RolesGuard } from "../auth/guards/roles.guard";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    getProducts(@Query('page') page: number, @Query('limit') limit: number) {
        try {
            if (page && limit) {
                return this.productsService.getProducts(page, limit);
            }
            return this.productsService.getProducts(1, 5);
        } catch (error) {
            throw new HttpException('Error al obtener productos', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('seeder')
    addProducts() {
        try {
            return this.productsService.addProducts();
        } catch (error) {
            throw new HttpException('Error al agregar productos', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getProductById(@Param('id', ParseUUIDPipe) id: string) {
        try {
            const producto = this.productsService.getProductById(id);
            if (!producto) {
                throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
            }
            return producto;
        } catch (error) {
            throw new HttpException('Error al obtener producto por ID', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @HttpCode(HttpStatus.OK)
    updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() updatedProduct: CreateProductDto) {
        try {
            if (!validateProduct(updatedProduct)) {
                throw new HttpException('Datos de producto inválidos', HttpStatus.BAD_REQUEST);
            }
            const result = this.productsService.updateProduct(id, updatedProduct);
            if (!result) {
                throw new HttpException('Producto no encontrado o no se pudo actualizar', HttpStatus.NOT_FOUND);
            }
            return id;
        } catch (error) {
            console.log(error.message);
            throw new HttpException('Error al actualizar producto', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}