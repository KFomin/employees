import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employees.schema';
import { EmployeeDto } from './employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {
  }

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Post()
  async create(@Body() createEmployeeDto: EmployeeDto) {
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

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEmployeeDto: EmployeeDto) {
    const updatedEmployee = await this.employeesService.updateEmployee(id, updateEmployeeDto);

    if (!updatedEmployee) {
      throw new BadRequestException('Employee not found.');
    }

    return updatedEmployee;
  }
}

