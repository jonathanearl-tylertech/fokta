import {
  BadRequestException,
  Controller,
  Get,
  Req,
} from "@nestjs/common";
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import * as jwt from "jsonwebtoken";
import { Request } from "express";
import { UsersService } from "src/users/users.service";

@ApiTags("oauth")
@Controller("oauth2/v1/userinfo")
export class UserInfoController {
  private JWT_SIGNATURE_SECRET = process.env.JWT_SIGNATURE_SECRET;

  @Get()
  @ApiOkResponse({ type: String })
  @ApiUnauthorizedResponse()
  async create(@Req() req: Request) {
    const authorizationHeader = req.headers.authorization;
    const [prefix, encodedJwt] = authorizationHeader.split(" ");
    if (prefix.toLowerCase() !== "bearer") {
      throw new BadRequestException(
        `Invalid prefix: ${prefix}, expected bearer`
      );
    }

    const decodedJwt = jwt.decode(encodedJwt, this.JWT_SIGNATURE_SECRET);
    return await this.users.findOne(decodedJwt.sub);
  }

  constructor(private readonly users: UsersService) {}
}
