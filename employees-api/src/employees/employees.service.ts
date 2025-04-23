import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDto } from './employees.schema';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel('Employee') private employeeModel: Model<Employee>,
  ) {
  }

  tagLookup = {
    from: 'tags',
    localField: 'tags',
    foreignField: '_id',
    as: 'tagDetails',
  };

  officeLookup = {
    from: 'offices',
    localField: 'officeId',
    foreignField: '_id',
    as: 'officeDetails',
  };

  match = (regex: RegExp) => [
    { firstName: regex },
    { lastName: regex },
    { phoneNo: regex },
    { 'tagDetails.name': regex },
    { 'officeDetails.name': regex },
  ];

  async findAll(): Promise<Employee[]> {
    return this.employeeModel
      .find()
      .populate('officeId')
      .populate('tags')
      .lean()
      .exec();
  }

  async search(search: string): Promise<Employee[]> {
    const regex = new RegExp(search.toLowerCase(), 'i');


    return this.employeeModel.aggregate([
      { $lookup: this.tagLookup },
      { $lookup: this.officeLookup },
      { $match: { $or: this.match(regex) } },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          phoneNo: 1,
          birthdate: 1,
          officeId: { $arrayElemAt: ['$officeDetails', 0] },
          tags: '$tagDetails',
        },
      },
    ])
      .exec();
  }


  async create(createEmployeeDto: EmployeeDto): Promise<Employee> {
    const newEmployee = new this.employeeModel(createEmployeeDto);
    return newEmployee.save();
  }

  async deleteEmployee(id: string): Promise<void> {
    const result = await this.employeeModel.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Employee not found');
    }
  }

  async updateEmployee(id: string, updateEmployeeDto: EmployeeDto): Promise<Employee | null> {
    return this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto, { new: true });
  }

  async isOfficeUsed(officeId: string): Promise<boolean> {
    const employeeCount = await this.employeeModel.countDocuments({ officeId });
    return employeeCount > 0;
  }
}
