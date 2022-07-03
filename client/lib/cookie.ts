import * as cookie from 'cookie';
import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';

export function getSessionId(req: IncomingMessage, res: ServerResponse) {
  const cookies = cookie.parse(req.headers.cookie ?? '');
  if (cookies.sid) {
    return cookies.sid;
  }
  
  const sid = uuidv4();
  res.setHeader('Set-Cookie', cookie.serialize('sid', sid, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7 * 4 // 1 month
  }));
  return sid;
}
