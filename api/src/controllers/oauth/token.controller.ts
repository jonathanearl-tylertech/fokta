import {
  Body,
  Controller,
  NotFoundException,
  NotImplementedException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseFilters,
} from "@nestjs/common";
import { ApiConflictResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { MongoExceptionFilter } from "src/filters/mongo-exception.filter";
import { Request, Response } from "express";
import { TokenRequestDto } from "src/dtos/token-request.dto";
import { CodeSessionService } from "src/services/code-session.service";
import { JWSService } from "src/services/jws.service";
import { UsersService } from "src/users/users.service";

@ApiTags("oauth")
@Controller("oauth2/v1/token")
export class TokenController {
  constructor(
    private readonly codeSession: CodeSessionService,
    private readonly jws: JWSService,
    private readonly users: UsersService
  ) {}

  @Post()
  @ApiConflictResponse()
  @ApiOkResponse({ type: String })
  @UseFilters(MongoExceptionFilter)
  async create(
    @Body() body: TokenRequestDto,
    @Res() res: Response,
    @Req() req: Request
  ) {
    const { client_id, client_secret, code, grant_type, scope } = body;
    // look up session by user by code
    if (client_id !== "fig") {
      throw new NotFoundException(
        "client_id 'fig' not registered with auth-server"
      );
    }

    if (client_secret !== "secret")
      throw new UnauthorizedException("invalid 'client_secret'");

    if (grant_type !== "authorization_code") {
      throw new NotImplementedException(
        "grant_type must be 'authorization_code'"
      );
    }

    const session = this.codeSession.get(code);
    if (!session) throw new UnauthorizedException("code invalid");

    this.codeSession.delete(code);

    const doc = await this.users.findOne(session.uid);
    if (!doc) throw new NotFoundException();

    const idToken = {
      sub: doc._id,
      email: doc.profile.email,
      iss: "auth-server",
      aud: "fig",
      exp: Date.now() + 60 * 5,
      iat: Date.now(),
      auth_time: Date.now(),
    };

    const jwt = await this.jws.signJWT(idToken);
    return jwt;
  }
}
