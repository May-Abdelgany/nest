import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { User } from 'src/schema/user.schema';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService:JwtService,
    @InjectModel(User.name) private UserModel: Model<User>
    ){}
 async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const request = context.switchToHttp().getRequest();
    const {authorization} = request.headers;
    if (!authorization?.startsWith('Hamada__')) {
      // return next(new Error('In-valid bearer key', { cause: 400 }))
      throw new HttpException('In-valid bearer key',400)
  }
  const token = authorization.split('Hamada__')[1]

  if (!token) {
      // return next(new Error('In-valid token', { cause: 400 }))
      throw new HttpException('In-valid token',400)

  }

  const decoded = await this.jwtService.verifyAsync(token, {secret:'aaaa'})
  if (!decoded?._id) {
      // return next(new Error('In-valid token payload', { cause: 400 }))
      throw new HttpException('In-valid token payload',400)

  }
  const authUser = await this.UserModel.findById(decoded._id)
  if (!authUser) {
      // return next(new Error('Not register account', { cause: 404 }))
      throw new HttpException('Not register account',404)

  }


  // req.user = authUser;
  request['user']=authUser
    
    return true;
  }
}
