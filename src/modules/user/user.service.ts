import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  userTest(req:Request): string {
    console.log(req['user']);
    
    return 'user module';
  }
}
