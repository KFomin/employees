import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfficesController } from './offices.controller';
import { OfficesService } from './offices.service';
import { OfficeSchema } from './offices.schema';
import { EmployeesModule } from '../employees/employees.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Office', schema: OfficeSchema }]),
    EmployeesModule,
  ],
  controllers: [OfficesController],
  providers: [OfficesService],
})
export class OfficesModule {
}
