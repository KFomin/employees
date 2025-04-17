import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Employee} from './employees.schema';

@Injectable()
export class EmployeesService {
    constructor(@InjectModel('Employee') private employeeModel: Model<Employee>) {
    }

    async findAll(): Promise<Employee[]> {
        return this.employeeModel
            .find()
            .populate('officeId')
            .populate('tags')
            .lean()
            .exec();
    }
}
