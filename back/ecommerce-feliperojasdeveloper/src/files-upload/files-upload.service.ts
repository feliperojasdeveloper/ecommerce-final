import { Injectable, NotFoundException } from '@nestjs/common';
import { FilesUploadRepository } from './files-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesUploadService {
    constructor(private readonly filesUploadRepository: FilesUploadRepository,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>
    ) { }

    async uploadProductImage(file: Express.Multer.File, productId: string) {
        const product = await this.productRepository.findOneBy({ id: productId });
        if(!product) {
            throw new NotFoundException("Producto no encontrado");
        }
        const uploadedImage = await this.filesUploadRepository.uploadImage(file);
        await this.productRepository.update(productId, {
            imgUrl: uploadedImage.secure_url,
        });

        const productUpdated = await this.productRepository.findOneBy({
            id: productId
        })

        return productUpdated;
    }
}
