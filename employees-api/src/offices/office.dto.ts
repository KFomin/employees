import { IsString, IsNotEmpty } from 'class-validator';

export class OfficeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  city: string;
}
