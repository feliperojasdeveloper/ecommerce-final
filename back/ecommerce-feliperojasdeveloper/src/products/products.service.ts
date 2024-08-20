import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./products.repository";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
    constructor(private readonly productRepository: ProductRepository) { }
    getProducts(page: number, limit: number) {
        return this.productRepository.findAll(page, limit);
    }

    getProductById(id: number) {
        return this.productRepository.findById(id);
    }

    create(createdProduct: Omit<Product, 'id'>) {
        return this.productRepository.save(createdProduct);

    }

    updateProduct(id: number, updatedProduct: Partial<Product>) {
        return this.productRepository.update(id, updatedProduct);
    }

    deleteProduct(id: number) {
        return this.productRepository.delete(id);
    }


}