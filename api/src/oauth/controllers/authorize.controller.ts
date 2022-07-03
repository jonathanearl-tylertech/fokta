import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserSessionService } from '../services/user-session.service';
import * as React from "react";
import * as ReactDOMServer from 'react-dom/server';


@ApiTags('oauth')
@Controller('oauth/v1/authorize')
export class OauthController {
  @Get('')
  async authorize(@Req() req: Request, @Res() res: Response) {
    // const session = await this.user.get(req, res);
    // if (!session) {
    //   const loginTemplate = await this.file.download('login');
    //   const page = await this.renderer.render(loginTemplate, { redirectUrl: 'http://localhost:5001' });
    //   return res.send(page).end();
    // }
    // return res.send(session);
    // const s = ReactDOMServer.renderToPipeableStream(React.createElement(Login,{ test: 'world'}));
    // res.pipe(s).end();
    res.redirect('/')
  }

  constructor(
    private readonly user: UserSessionService
  ) {}
}
