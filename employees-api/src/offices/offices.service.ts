import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Office } from './offices.schema';

@Injectable()
export class OfficesService {
    constructor(@InjectModel('Office') private officeModel: Model<Office>) {}

    async findAll(): Promise<Office[]> {
        return this.officeModel
            .find()
            .lean()
            .exec();
    }

    async create(office: Office): Promise<Office> {
        const newOffice = new this.officeModel(office);
        return newOffice.save();
    }
}
