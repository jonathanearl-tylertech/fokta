import { Injectable } from "@nestjs/common";
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CacheService } from "./cache.service";

@Injectable()
export class UserSessionService {
  private SESSION_KEY = 'sid';

  get = async (req: Request, res: Response) => {
    const id = this._getSessionId(req, res);
    const session = await this.cache.get(id);
    return session;
  }

  set = async (req: Request, res: Response, obj: any) => {
    const id = this._getSessionId(req, res);
    await this.cache.set(id, '$', obj);
  }


  private _getSessionId(req: Request, res: Response) {
    const sid = req.cookies[this.SESSION_KEY] ?? this._generateUuid();
    res.cookie(this.SESSION_KEY, sid);
    return sid;
  }

  private _generateUuid() {
    return uuidv4();
  }

  constructor(private readonly cache: CacheService) {}
}
