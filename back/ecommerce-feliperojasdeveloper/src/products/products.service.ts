import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./products.repository";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
    constructor(private readonly productRepository: ProductRepository){}
    getProducts(){
        return this.productRepository.findAll();
    }

    create(createdProduct: Product){
        try {
            this.productRepository.save(createdProduct);
            return "Producto creado";
        } catch (error) {
            return error;
        }
    }


}