import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {OfficesController} from './offices.controller';
import {OfficesService} from './offices.service';
import {OfficeSchema} from './offices.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: 'Office',
            schema: OfficeSchema
        }]),
    ],
    controllers: [OfficesController],
    providers: [OfficesService],
})
export class OfficesModule {
}
