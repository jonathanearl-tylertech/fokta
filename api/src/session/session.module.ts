import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { Uuid } from '../services/uuid.service';

@Module({
  controllers: [SessionController],
  providers: [
    SessionService,
    Uuid,
  ]
})
export class SessionModule {}
