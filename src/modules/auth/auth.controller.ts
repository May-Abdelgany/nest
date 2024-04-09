import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './validation/signUp.dto';
import { ZodValidationPipe } from 'src/pipe/validation.pipe';
import { signUpSchema } from './validation/signUp.schema';
import { User } from 'src/schema/user.schema';
import { LoginDto } from './validation/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('test')
  authTest(): string {
    return this.authService.authTest();
  }

  @Post('signUp')
  @UsePipes(new ZodValidationPipe(signUpSchema))
  signUp(@Body() body: SignUpDto): Promise<User> {
    return this.authService.signUp(body);
  }

   @Post('login')
   @HttpCode(200)
   login(@Body() body:LoginDto):Promise<any>{
          return this.authService.login(body)
   }
}
