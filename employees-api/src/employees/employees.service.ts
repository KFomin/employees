import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './employees.schema';
import { CreateEmployeeDto } from './create-employee.dto';

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

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = new this.employeeModel(createEmployeeDto);
    return newEmployee.save();
  }

  async deleteEmployee(id: string): Promise<void> {
    const result = await this.employeeModel.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Employee not found');
    }
  }
}
