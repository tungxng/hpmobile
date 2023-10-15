import { Controller, Get, HttpStatus, Res, Query, Post, UploadedFile, UseInterceptors, Param, Delete, NotFoundException } from '@nestjs/common';
import { UploadDto } from '../dto/upload.dto';
import { UploadService } from '../service/upload.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('images')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }
  @ApiTags('Upload image')
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', {
    dest: './public/uploads', fileFilter: (req, file, callback) => {
      if (['jpg', 'png'].includes(file.originalname.split('.').pop())) {
        return callback(null, true);
      }
      return callback(new Error('Only .jpg, .png files are allowed!'), false);
    }
  }))
  async uploadImage(@UploadedFile() file) {
    const { originalname, mimetype, size } = file;
    // Update the filename to include the correct extension based on mimetype
    if (file.mimetype === 'image/jpeg') {
      file.filename = `${file.filename}.jpg`;
    } else if (file.mimetype === 'image/png') {
      file.filename = `${file.filename}.png`;
    }

    // Move the file to the destination directory with the updated filename
    const newFilePath = path.join('./public/uploads', file.filename);
    fs.renameSync(file.path, newFilePath);
    const imageInfo = {
      filename: file.filename,
      originalname,
      mimetype,
      size,
    };
    const createdImage = await this.uploadService.createImage(imageInfo);
    return { message: 'Image uploaded successfully', image: createdImage };
  }
  @Get('/get')
  async getAllImages() {
    const images = await this.uploadService.getAllImages();
    return images;
  }
  @Delete('/delete:id')
  async deleteDataByName(@Param('id') id: string) {
    const deletedData = await this.uploadService.deleteData(id);
    if (!deletedData) {
      throw new NotFoundException(`Data with ${id} not found.`);
    }
    return `Data with ${id} has been deleted.`;
  }
}
