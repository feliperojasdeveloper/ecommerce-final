import { Product } from "./entities/product.entity";

export class ProductRepository {
    private products: Product[] = [];

    findAll(page: number = 1, limit: number = 5): Product[] {
        const startIndex = (page - 1) * limit;
        return this.products.slice(startIndex, startIndex + limit);
    }

    findById(id: number): Product {
        return this.products.find((product) => product.id === id);
    }

    save(newProduct: Omit<Product, 'id'>): Product {
        const id = this.products.length + 1;
        this.products = [... this.products, { id, ...newProduct }];
        return { id, ...newProduct };
    }

    update(id: number, updatedProduct: Partial<Product>) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }
        const product = this.products[productIndex];
        this.products[productIndex] = { ...product, ...updatedProduct };
        return this.products[productIndex];
    }

    delete(id: number): number {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }
        this.products.splice(productIndex, 1);
        return id;
    }
}