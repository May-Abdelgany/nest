import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule,UserModule,MongooseModule.forRoot('mongodb://localhost:27017/fridayNest')],
  controllers: [AppController],
  providers: [AppService,JwtService],
})
export class AppModule {}
