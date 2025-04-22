import { Controller, Get, Post, Body, Put, Param, Delete, BadRequestException } from '@nestjs/common';
import { OfficesService } from './offices.service';
import { Office } from './offices.schema';
import { OfficeDto } from './office.dto';
import { EmployeesService } from '../employees/employees.service';

@Controller('offices')
export class OfficesController {
  constructor(private readonly officesService: OfficesService,
              private readonly employeesService: EmployeesService) {
  }

  @Get()
  async findAll(): Promise<Office[]> {
    return this.officesService.findAll();
  }

  @Post()
  async create(@Body() office: Office): Promise<Office> {
    return this.officesService.create(office);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateOfficeDto: OfficeDto): Promise<Office | null> {
    return this.officesService.update(id, updateOfficeDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    const officeInUse = await this.employeesService.isOfficeUsed(id);
    if (officeInUse) {
      throw new BadRequestException('Cannot delete office because it is in use by an employee.');
    }
    return this.officesService.delete(id);
  }
}
