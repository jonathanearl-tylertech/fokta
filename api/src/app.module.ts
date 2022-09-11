import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Uuid } from "./services/uuid.service";
import { UsersModule } from "./users/users.module";
import { ClientsModule } from "./clients/clients.module";
import { SessionModule } from "./session/session.module";
import { Oauth2Module } from './oauth2/oauth2.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/openid"),
    UsersModule,
    ClientsModule,
    SessionModule,
    Oauth2Module,
  ],
  providers: [
    Uuid,
  ],
})
export class AppModule {}
