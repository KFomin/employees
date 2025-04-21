import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employees.schema';
import { CreateEmployeeDto } from './create-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }
}
