import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from '../model/image.model';

@Injectable()
export class UploadService {
  constructor(@InjectModel('Image') private readonly imageModel: Model<Image>) { }

  async createImage(fileInfo: Partial<Image>): Promise<Image> {
    const createdImage = new this.imageModel(fileInfo);
    return createdImage.save();
  }
  async getAllImages(): Promise<Image[]> {
    const images = await this.imageModel.find().exec();
    return images;
  }
  async deleteData(id: string) {
    const deletedData = await this.imageModel.findByIdAndDelete(id).exec();
    return deletedData;
  }
}
