import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from './tags.schema';
import { TagDto } from './tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectModel('Tag') private tagModel: Model<Tag>) {
  }

  async findAll(): Promise<Tag[]> {
    return this.tagModel
      .find()
      .lean()
      .exec();
  }

  async search(search: string): Promise<Tag[]> {
    const regex = new RegExp(search, 'i');

    return this.tagModel.find({
      $or: [
        { name: regex },
      ],
    }).exec();
  }

  async create(tag: Tag): Promise<Tag> {
    const newTag = new this.tagModel(tag);
    return newTag.save();
  }


  async update(id: string, updateTagDto: TagDto): Promise<Tag | null> {
    return this.tagModel.findByIdAndUpdate(id, updateTagDto, { new: true });
  }

  async delete(id: string): Promise<void> {
    await this.tagModel.findByIdAndDelete(id);
  }
}
