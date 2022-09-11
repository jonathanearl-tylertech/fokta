import {
  BadRequestException,
  Body,
  Controller,
  NotImplementedException,
  Post,
  Redirect,
  Req,
  Res,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { AuthorizeRequestDto } from "../dtos/authorize-request.dto";
import { UserSession } from "../interfaces/UserSession";
import { ClientsService } from "src/clients/clients.service";
import { CodeSessionService } from "../services/code-session.service";
import { UserSessionService } from "../services/user-session.service";

@ApiTags("oauth")
@Controller("oauth2/v1/authorize")
export class AuthorizeController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly codeSession: CodeSessionService,
    private readonly userSession: UserSessionService
  ) { }

  @Post()
  @Redirect()
  async post(
    @Body() body: AuthorizeRequestDto,
    @Res() res: Response,
    @Req() req: Request
  ) {
    const { response_type, scope, client_id, state, redirect_uri, nonce } =
      body;
    let { sid } = req.cookies;
    const userSession = this.userSession.get(sid);
    if (!userSession) return res.redirect("/login");

    if (response_type.toLowerCase().trim() !== "code")
      throw new NotImplementedException("only 'code' is supported");

    if (!scope.includes("openid"))
      throw new BadRequestException("scope must include 'openid'");

    const client = await this.clientsService.findOne(client_id);
    if (!client)
      throw new BadRequestException(`client_id not registered ${client_id}`);

    if (
      !client.redirect_uris.includes('*') &&
      !client.redirect_uris.includes(redirect_uri)
    )
      throw new BadRequestException(`redirect_uri not registed for ${client_id}`);

    const code = this.codeSession.set({ uid: userSession.uid });
    if (userSession) return res.redirect(`${redirect_uri}&code=${code}`);

    sid = this.userSession.set(body as UserSession);
    return res
      .cookie("sid", sid, { httpOnly: true })
      .redirect(`${redirect_uri}$code=${userSession.code}`);
  }
}
