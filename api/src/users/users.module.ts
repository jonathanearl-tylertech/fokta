import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User, UserSchema } from "./user.schema";
import { EncryptService } from "./services/encrypt.service";

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [EncryptService, UsersService],
})
export class UsersModule {}
