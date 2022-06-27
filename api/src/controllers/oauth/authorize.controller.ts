// import {
//   BadRequestException,
//   Body,
//   Controller,
//   Get,
//   NotImplementedException,
//   Post,
//   Query,
//   Redirect,
//   Req,
//   Res,
// } from "@nestjs/common";
// import { ApiTags } from "@nestjs/swagger";
// import { Request, Response } from "express";
// import { AuthorizeRequestDto } from "src/dtos/authorize-request.dto";
// import { UserSession } from "src/interfaces/UserSession";
// import { ClientService } from "src/services/client.service";
// import { CodeSessionService } from "src/services/code-session.service";
// import { UserSessionService } from "src/services/user-session.service";

// @ApiTags("oauth")
// @Controller("oauth2/v1/authorize")
// export class AuthorizeController {
//   constructor(
//     private readonly clientService: ClientService,
//     private readonly codeSession: CodeSessionService,
//     private readonly userSession: UserSessionService
//   ) {}

//   @Get()
//   get(@Query() query: AuthorizeRequestDto) {
//     const { response_type, scope, client_id, state, redirect_uri, nonce } =
//       query;
//     if (!scope.includes("openid"))
//       throw new BadRequestException("scope must include 'openid'");

//     return query;
//   }

//   @Post()
//   @Redirect()
//   post(
//     @Body() body: AuthorizeRequestDto,
//     @Res() res: Response,
//     @Req() req: Request
//   ) {
//     const { response_type, scope, client_id, state, redirect_uri, nonce } =
//       body;
//     let { sid } = req.cookies;
//     const userSession = this.userSession.get(sid);
//     if (!userSession) return res.redirect("/login");

//     if (response_type.toLowerCase().trim() !== "code")
//       throw new NotImplementedException("only 'code' is supported");

//     if (!scope.includes("openid"))
//       throw new BadRequestException("scope must include 'openid'");

//     const client = this.clientService.findOne(client_id);
//     if (!client)
//       throw new BadRequestException(`client_id not registered ${client_id}`);

//     if (
//       !client.redirect_uri.includes("*") &&
//       !client.redirect_uri.includes(redirect_uri)
//     )
//       throw new BadRequestException(
//         `redirect_uri not registed for ${client_id}`
//       );

//     const code = this.codeSession.set({ uid: userSession.uid });
//     if (userSession) return res.redirect(`${redirect_uri}&code=${code}`);

//     sid = this.userSession.set(body as UserSession);
//     return res
//       .cookie("sid", sid, { httpOnly: true })
//       .redirect(`${redirect_uri}$code=${userSession.code}`);
//   }
// }
