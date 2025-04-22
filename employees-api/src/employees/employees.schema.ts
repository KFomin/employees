import { Schema, Document } from 'mongoose';
import { IsString, IsNotEmpty, IsPhoneNumber, IsDateString } from 'class-validator';

export class EmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsPhoneNumber()
  phoneNo: string;

  @IsDateString()
  birthdate: string;

  @IsString()
  @IsNotEmpty()
  officeId: string;

  @IsString({ each: true })
  tags: string[];
}

export const EmployeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNo: { type: String, required: true },
  birthdate: { type: Date, required: true },
  officeId: { type: Schema.Types.ObjectId, ref: 'Office', required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
});

export interface Employee extends Document {
  id: string;
  firstName: string;
  lastName: string;
  officeId: string;
  birthdate: Date;
  phoneNo: string;
  tags: string[];
}
