import { Product } from "./entities/product.entity";

export class ProductRepository {
    private products: Product[] = [];

    findAll(): Product[]{
        return this.products;
    }

    save(newProduct: Product): void {
        this.products.push(newProduct);
    }
}