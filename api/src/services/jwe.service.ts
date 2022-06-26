import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jose from 'jose';
import { randomFillSync } from 'crypto';

@Injectable()
export class JWEService {
  private secret: any;

  async encrypt(payload: any) {
    if (!this.secret)
      this.secret = randomFillSync(new Uint8Array(32));

    const jwe = await new jose.EncryptJWT(payload)
      .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
      .setIssuedAt()
      .setIssuer('http://localhost:5001')
      .setAudience('http://localhost:5001')
      .setExpirationTime('30s')
      .encrypt(this.secret)
    return jwe;
  }

  async decrypt(jwe: string) {
    if (!this.secret)
      throw new UnauthorizedException();

    try  {
      const { payload, protectedHeader } = await jose.jwtDecrypt(jwe, this.secret)
      console.log(payload, protectedHeader)
      return payload;
    } catch (ex) {
      console.log(ex)
    }

  }
}