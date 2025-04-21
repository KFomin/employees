import { IsString, IsNotEmpty, IsPhoneNumber, IsDateString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsPhoneNumber()
  phoneNo: string;

  @IsDateString()
  birthdate: string;

  @IsString()
  @IsNotEmpty()
  officeId: string;

  @IsString({ each: true })
  tags: string[];
}
