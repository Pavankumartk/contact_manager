import { IsEmail, IsNotEmpty, IsString, IsOptional, Matches } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^[0-9+\-\s()]+$/, { message: 'Invalid mobile number format' })
  mobile: string;

  @IsOptional()
  @IsString()
  company_name?: string;

  @IsOptional()
  @IsString()
  job_title?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
