import { BadRequestException, Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employees.schema';
import { CreateEmployeeDto } from './create-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {
  }

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.employeesService.deleteEmployee(id);
      return { message: 'Employee deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

