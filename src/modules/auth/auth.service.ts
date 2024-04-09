import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignUpDto } from './validation/signUp.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './validation/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  authTest(): string {
    return 'auth module';
  }

  async signUp(body: SignUpDto): Promise<User> {
    const { email, password, name } = body;

    const emailExist = await this.UserModel.findOne({ email });
    if (emailExist) {
      throw new ConflictException('email already exist');
    }
    const hashPassword = bcrypt.hashSync(password, 8);

    const user = await this.UserModel.create({
      email,
      name,
      password: hashPassword,
    });

    return user;
  }

  async login(body: LoginDto): Promise<any> {
    const { email, password } = body;
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('invalid email');
    }
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      throw new BadRequestException('invalid password');
    }
    const token = await this.jwtService.signAsync(
      {
        _id: user['_id'],
        email: user.email,
      },
      { secret: 'aaaa', expiresIn: 60 * 60 },
    );


    const refresh_token = await this.jwtService.signAsync(
      {
        _id: user['_id'],
        email: user.email,
      },
      { secret: 'aaaa'},
    );
    return { token ,refresh_token};
  }
}
