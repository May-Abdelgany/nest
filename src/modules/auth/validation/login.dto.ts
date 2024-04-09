import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,

} from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
