import * as mongoose from 'mongoose';

export const ImageSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  mimetype: String,
  size: Number,
  created_at: { type: Date, default: Date.now },
});

export interface Image extends mongoose.Document {
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  created_at: Date;
}
