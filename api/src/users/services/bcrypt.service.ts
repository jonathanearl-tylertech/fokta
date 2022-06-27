import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class BcryptService {
  DEFAULT_WORKFACTOR = 10;
  DEFAULT_ALGORITHM = "BCRYPT";

  hash = async (password: string, workFactor = 10) => {
    try {
      return bcrypt.hash(password, workFactor);
    } catch (err) {
      throw new InternalServerErrorException(
        `Unable to hash credentials.password.value: ${err.message}`
      );
    }
  };

  compare = async (password: string, encrypted: string) =>
    await bcrypt.compare(password, encrypted);
}
