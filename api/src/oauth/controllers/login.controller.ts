import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserSessionService } from '../services/user-session.service';
import * as React from "react";
import * as ReactDOMServer from 'react-dom/server';
import { promises as fs } from 'fs';
import { cwd } from 'process';
import * as path from 'path';

 

@ApiTags('login')
@Controller({ host: 'login.localhost' })
export class LoginController {
  @Get('')
  async login(@Req() req: Request, @Res() res: Response) {
    // const session = await this.userSession.get(req, res);
    // const referrer = req.get('Referrer');
    // if (session)
    //   return res.redirect('/app/dashboard');

    // const buffer = await fs.readFile(path.join(cwd(), 'src/oauth/public/index.html'));
    // const loginTemplate = buffer.toString();
    // const redirectUrl = referrer?.includes('authorize') ? referrer : '/app/dashboard';
    // const loginPage = loginTemplate.replace('{redirectUrl}', `"${redirectUrl}"`);
    // return res.send(loginPage).end();

    // const element = React.createElement(Login)
    // const component = ReactDOMServer.renderToString(element)
    // return res.send(component).end();
  }

  @Get('script.js')
  async script() {
    const file = await fs.readFile(path.join(cwd(), 'src/oauth/public/script.js'));
    return file.toString();
  }

  constructor(
    private readonly userSession: UserSessionService
  ) {}
}
