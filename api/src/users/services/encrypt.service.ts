import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class EncryptService {
  hash = async (password: string) => await bcrypt.hash(password, 10);

  compare = async (password: string, encrypted: string) =>
    await bcrypt.compare(password, encrypted);
}
