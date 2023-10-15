import { Module } from '@nestjs/common';
import { UploadService } from './service/upload.service';
import { UploadController } from './controller/upload.controller';
import { ImageSchema } from './model/image.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
