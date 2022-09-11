import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User, UserSchema } from "./schema/user.schema";
import { BcryptService } from "./services/bcrypt.service";
import { Provider, ProviderSchema } from "./schema/provider.schema";
import { Profile, ProfileSchema } from "./schema/profile.schema";
import { ProviderService } from "./services/providers.service";
import { Credentials, CredentialsSchema } from "./schema/credentials.schema";
import { PasswordService } from "./services/password.service";

@Module({
  controllers: [UsersController],
  exports: [UsersService],
  imports: [
    MongooseModule.forFeature([{ name: Credentials.name, schema: CredentialsSchema },]),
    MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    MongooseModule.forFeature([{ name: Provider.name, schema: ProviderSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [BcryptService, UsersService, PasswordService, ProviderService],
})
export class UsersModule {}
