import { Module } from '@nestjs/common';
import { OauthController } from './controllers/authorize.controller';
import { LoginController } from './controllers/login.controller';
import { CacheService } from './services/cache.service';
import { UserSessionService } from './services/user-session.service';

@Module({
  controllers: [
    LoginController,
    OauthController
  ],
  providers: [
    CacheService,
    UserSessionService,
  ]
})
export class OauthModule { }
