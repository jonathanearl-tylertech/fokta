import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SessionRequestDto } from "../dtos/session-request.dto";
import { JWEService } from "../services/jwe.service";

@ApiTags("api")
@Controller("api/v1/session")
export class SessionController {
  @Post()
  async createSession(@Body() body: SessionRequestDto) {
    const { sessionToken } = body;
    if (!sessionToken) throw new UnauthorizedException();

    const data = await this.jwe.decrypt(sessionToken);
    return data;
  }

  constructor(private readonly jwe: JWEService) {}
}
