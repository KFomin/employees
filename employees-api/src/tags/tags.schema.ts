import { Schema, Document } from 'mongoose';
import { IsString, IsNotEmpty } from 'class-validator';

export class TagDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export const TagSchema = new Schema({
  name: { type: String, required: true },
});

export interface Tag extends Document {
  id: string;
  name: string;
}
