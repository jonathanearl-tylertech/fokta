import { Injectable, NotImplementedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Provider, ProviderDocument } from "../schema/provider.schema";

@Injectable()
export class ProviderService {
  async create() {
    throw new NotImplementedException();
  }

  async findAll() {
    throw new NotImplementedException();
  }

  async findOne(type: string) {
    if (type !== "FOKTA") throw new NotImplementedException();
    return (
      (await this.provider.findOne({ type })) ??
      (await this.provider.create({
        _id: new Types.ObjectId(),
        name: "FOKTA",
        type: "FOKTA",
      }))
    );
  }

  async update(id: string) {
    throw new NotImplementedException();
  }

  async remove(id: string) {
    throw new NotImplementedException();
  }

  constructor(
    @InjectModel(Provider.name)
    private readonly provider: Model<ProviderDocument>
  ) {}
}
