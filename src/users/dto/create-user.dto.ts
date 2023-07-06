import {
  // IsDate,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsPhoneNumber()
  mobile: number;

  @IsEmail()
  email: string;

  // @IsDate()
  date_of_birth: Date;

  @IsStrongPassword()
  password: string;
}
