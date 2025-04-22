import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './employees.schema';
import { EmployeeDto } from './employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel('Employee') private employeeModel: Model<Employee>,
  ) {
  }

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

    return this.employeeModel.find({
      $or: [
        { firstname: regex },
        { lastname: regex },
        { phoneNo: regex },
      ],
    })
      .populate('officeId')
      .populate('tags')
      .lean()
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
