import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from './tags.schema';

@Injectable()
export class TagsService {
    constructor(@InjectModel('Tag') private tagModel: Model<Tag>) {}

    async findAll(): Promise<Tag[]> {
        return this.tagModel
            .find()
            .lean()
            .exec();
    }

    async create(tag: Tag): Promise<Tag> {
        const newTag = new this.tagModel(tag);
        return newTag.save();
    }
}
