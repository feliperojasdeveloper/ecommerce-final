import { Module } from '@nestjs/common';
import { FilesUploadService } from './files-upload.service';
import { FilesUploadController } from './files-upload.controller';
import { FilesUploadRepository } from './files-upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { CloudinaryConfig } from '../config/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [FilesUploadController],
  providers: [FilesUploadService, FilesUploadRepository, CloudinaryConfig],
})
export class FilesUploadModule {}
