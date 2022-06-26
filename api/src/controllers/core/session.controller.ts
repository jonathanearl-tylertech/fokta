import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SessionRequestDto } from "src/dtos/session-request.dto";
import { JWEService } from "src/services/jwe.service";

@ApiTags("api")
@Controller("api/v1/session")
export class SessionController {
  constructor(private readonly jwe: JWEService) {}

  @Post()
  async createSession(@Body() body: SessionRequestDto) {
    const { sessionToken } = body;
    if (!sessionToken) throw new UnauthorizedException();

    const data = await this.jwe.decrypt(sessionToken);
    return data;
  }
}
