import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

@Injectable()
export class CacheService {
  get = async (key: string) => {
    const client = createClient();
    await client.connect();
    return await client.json.get(key);
  }

  set = async (key: string, path: string, obj: any) => {
    const client = createClient();
    await client.connect();
    return await client.json.set(key, path , obj);
  }
}
