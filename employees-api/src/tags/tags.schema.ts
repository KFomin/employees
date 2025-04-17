import { Schema, Document } from 'mongoose';

export const TagSchema = new Schema({
    name: { type: String, required: true },
});

export interface Tag extends Document {
    id: string;
    name: string;
}
