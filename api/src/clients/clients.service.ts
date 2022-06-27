import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, FilterQuery, Types } from "mongoose";
import { Uuid } from "src/services/uuid.service";
import { Clients, ClientsDocument } from "./clients.schema";
import { CreateClientDto } from "./dto/create-client.dto";
import { SearchClientDto } from "./dto/search-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@Injectable()
export class ClientsService {
  async create(data: CreateClientDto) {
    const client_secret = this.uuid.generate();
    return this.clients.create({
      _id: new Types.ObjectId(),
      client_id_issued_at: new Date(),
      client_secret,
      ...data,
    });
  }

  async findAll(search: SearchClientDto) {
    const { client_name } = search;
    const filter: FilterQuery<ClientsDocument> = {};
    if (client_name) filter.name = new RegExp(client_name, "i");
    return this.clients.find(filter)
  }

  async findOne(id: string) {
    return this.clients.findById(new Types.ObjectId(id))
  }

  async update(id: string, doc: UpdateClientDto) {
    return this.clients.findByIdAndUpdate(new Types.ObjectId(id), doc);
  }

  async remove(id: string) {
    return this.clients.findByIdAndDelete(new Types.ObjectId(id));
  }

  constructor(
    @InjectModel(Clients.name) private readonly clients: Model<ClientsDocument>,
    private readonly uuid: Uuid
  ) { }
}
