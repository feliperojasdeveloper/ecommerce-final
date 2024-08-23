import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./products.repository";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
    constructor(private productRepository: ProductRepository) {}

    getProducts(page: number, limit: number) {
        return this.productRepository.getProducts(page, limit);
    }

    getProductById(id: string) {
        return this.productRepository.getProductById(id);
    }

    addProducts() {
        return this.productRepository.addProducts();
    }

    updateProduct(id: string, updatedProduct: Partial<Product>) {
        return this.productRepository.updateProduct(id, updatedProduct);
    }
}