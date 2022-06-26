import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { PasswordService } from 'src/services/password.service';

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [
    PasswordService,
    UsersService
  ],
})
export class UsersModule { }
