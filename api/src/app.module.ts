import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserInfoController } from './controllers/oauth/user-info.controller';
import { PasswordService } from './services/password.service';
import { AuthorizeController } from './controllers/oauth/authorize.controller';
import { TokenController } from './controllers/oauth/token.controller';
import { UserSessionService } from './services/user-session.service';
import { Uuid } from './services/uuid.service';
import { CodeSessionService } from './services/code-session.service';
import { WellknownController } from './controllers/wellknown.controller';
import { JwksController } from './controllers/oauth/keys.controller';
import { JWSService } from './services/jws.service';
import { JWEService } from './services/jwe.service';
import { UsersModule } from './users/users.module';
import { ClientService } from './services/client.service';

@Module({
  controllers: [
    // AuthorizeController,
    // JwksController,
    // TokenController,
    // UserInfoController,
    // WellknownController,
  ],
  imports: [
    MongooseModule.forRoot('mongodb://localhost/openid'),
    UsersModule,
  ],
  providers: [
    ClientService,
    CodeSessionService,
    JWEService,
    JWSService,
    PasswordService,
    UserSessionService,
    Uuid
  ],
})
export class AppModule { }
