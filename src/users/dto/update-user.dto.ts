import {
  // IsDate,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  frist_name: string;

  @IsString()
  last_name: string;

  // @IsDate()
  date_of_birth: Date;

  @IsPhoneNumber()
  mobile: number;
}
