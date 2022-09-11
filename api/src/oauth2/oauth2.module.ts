import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from 'src/clients/clients.module';
import { Clients, ClientsSchema } from 'src/clients/clients.schema';
import { ClientsService } from 'src/clients/clients.service';
import { Uuid } from 'src/services/uuid.service';
import { UsersModule } from 'src/users/users.module';
import { AuthorizeController } from './controllers/authorize.controller';
import { JwksController } from './controllers/keys.controller';
import { TokenController } from './controllers/token.controller';
import { UserInfoController } from './controllers/user-info.controller';
import { CodeSessionService } from './services/code-session.service';
import { JWEService } from './services/jwe.service';
import { JWSService } from './services/jws.service';
import { UserSessionService } from './services/user-session.service';

@Module({
  controllers: [
    AuthorizeController,
    JwksController,
    TokenController,
    UserInfoController,
  ],
  imports: [
    ClientsModule,
    UsersModule,
    MongooseModule.forFeature([{ name: Clients.name, schema: ClientsSchema }]),
  ],
  providers: [
    ClientsService,
    CodeSessionService,
    JWEService,
    JWSService,
    UserSessionService,
    Uuid,
  ],
})
export class Oauth2Module {}
