import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    
    return 'Hello World!';
  }


  getHamada():string{
    return 'hamada'
  }
}
