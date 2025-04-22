import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OfficesService } from './offices.service';
import { Office } from './offices.schema';
import { OfficeDto } from './office.dto';

@Controller('offices')
export class OfficesController {
  constructor(private readonly officesService: OfficesService) {
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
    return this.officesService.delete(id);
  }
}
