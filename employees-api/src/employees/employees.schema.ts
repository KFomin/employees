import { Schema, Document } from 'mongoose';

export const EmployeeSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  officeId: { type: Schema.Types.ObjectId, ref: 'Office', required: true },
  birthdate: { type: Date, required: true },
  phoneNo: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
});

export interface Employee extends Document {
  id: string;
  firstname: string;
  lastname: string;
  officeId: string;
  birthdate: Date;
  phoneNo: string;
  tags: string[];
}
