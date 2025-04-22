import { Schema, Document } from 'mongoose';
import { IsString, IsNotEmpty } from 'class-validator';

export class OfficeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;
}


export const OfficeSchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
});

export interface Office extends Document {
  id: string;
  name: string;
  city: string;
}
