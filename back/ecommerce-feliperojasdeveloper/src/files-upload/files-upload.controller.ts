import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesUploadService } from './files-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesUploadController {
  constructor(private readonly filesUploadService: FilesUploadService) { }

  @Post('uploadimage/:id')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@Param('id') id: string, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 200000,
          message: "El archivo debe ser menor a 200kb"
        }),
        new FileTypeValidator({
          fileType: /(jpg|jpeg|png|webp)$/
        })
      ]
    })
  ) file: Express.Multer.File) {
    return await this.filesUploadService.uploadProductImage(file, id);
  }
}
