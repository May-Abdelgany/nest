import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guard/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService:UserService) {}

  @Get('test')
  @UseGuards(AuthGuard)
  userTest(@Req() req :Request): string {
    return this.userService.userTest(req);
  }
}
