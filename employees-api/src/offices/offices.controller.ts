import { Controller, Get, Post, Body } from '@nestjs/common';
import { OfficesService } from './offices.service';
import { Office } from './offices.schema';

@Controller('offices')
export class OfficesController {
    constructor(private readonly officesService: OfficesService) {}

    @Get()
    async findAll(): Promise<Office[]> {
        return this.officesService.findAll();
    }

    @Post()
    async create(@Body() office: Office): Promise<Office> {
        return this.officesService.create(office);
    }
}
