import { Injectable } from "@nestjs/common";
import { Uuid } from "../services/uuid.service";
import { CreateSessionDto } from "./dto/create-session.dto";
import { UpdateSessionDto } from "./dto/update-session.dto";

@Injectable()
export class SessionService {
  session: any = {};

  create(createSessionDto: CreateSessionDto) {
    const { uid } = createSessionDto;
    console.log(uid);
    const sid = this.uuid.generate();
    this.session[sid] = {
      uid,
      createdAt: Date.now(),
    };
    return this.session[sid];
  }

  findAll() {
    return Object.entries(this.session);
  }

  findOne(id: string) {
    return this.session[id];
  }

  update(id: string, updateSessionDto: UpdateSessionDto) {
    this.session[id] = {
      ...this.session[id],
      ...updateSessionDto,
    };
    return this.session[id];
  }

  remove(id: string) {
    this.session[id] = undefined;
  }

  constructor(private readonly uuid: Uuid) {}
}
