import { IncomingMessage, ServerResponse } from 'http';
import { createClient } from 'redis';
import { getSessionId } from './cookie';

const client = createClient();

export async function getUserSession(req: IncomingMessage, res: ServerResponse) {
  await client.connect();
  const id = getSessionId(req, res);
  const user = await client.get(id);
  if (!user)
    return null;
  
  return await JSON.parse(user) as any;
}
