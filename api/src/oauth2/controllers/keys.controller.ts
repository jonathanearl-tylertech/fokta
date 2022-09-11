import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JWSService } from "../services/jws.service";

@ApiTags("oauth")
@Controller("oauth2/v1/keys")
export class JwksController {
  constructor(private readonly jws: JWSService) {}

  @Get()
  async jwks() {
    const keys = await this.jws.getKeys();
    return { keys };
  }
}
