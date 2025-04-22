import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Office } from './offices.schema';
import { OfficeDto } from './office.dto';

@Injectable()
export class OfficesService {
  constructor(@InjectModel('Office') private officeModel: Model<Office>) {
  }

  async findAll(): Promise<Office[]> {
    return this.officeModel
      .find()
      .lean()
      .exec();
  }

  async search(search: string): Promise<Office[]> {
    const regex = new RegExp(search, 'i');

    return this.officeModel.find({
      $or: [
        { name: regex },
        { city: regex }
      ],
    }).exec();
  }


  async create(office: Office): Promise<Office> {
    const newOffice = new this.officeModel(office);
    return newOffice.save();
  }

  async update(id: string, updateOfficeDto: OfficeDto): Promise<Office | null> {
    return this.officeModel.findByIdAndUpdate(id, updateOfficeDto, { new: true });
  }

  async delete(id: string): Promise<void> {
    await this.officeModel.findByIdAndDelete(id);
  }

}
