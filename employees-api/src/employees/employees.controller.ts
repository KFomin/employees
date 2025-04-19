import { Controller, Get } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employees.schema';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }
}
