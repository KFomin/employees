import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {EmployeesModule} from "./employees/employees.module";
import {OfficesModule} from "./offices/offices.module";
import { TagsModule } from './tags/tags.module';
import * as process from "node:process";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI!),
        EmployeesModule,
        OfficesModule,
        TagsModule
    ],
})
export class AppModule {
}
