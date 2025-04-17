import { Schema, Document } from 'mongoose';

export const OfficeSchema = new Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
});

export interface Office extends Document {
    id: string;
    name: string;
    city: string;
}
