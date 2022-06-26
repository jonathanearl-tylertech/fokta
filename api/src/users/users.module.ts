import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordService } from 'src/services/password.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.schema';

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [
    PasswordService,
    UsersService,
  ],
})
export class UsersModule { }
