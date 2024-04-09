import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Max, MaxLength, Min, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;


  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(10)
  name: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
  
  @IsNotEmpty()
  @IsStrongPassword()
  cPassword: string;
}
