import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, FilterQuery } from "mongoose";
import { Clients, ClientsDocument } from "./clients.schema";
import { CreateClientDto } from "./dto/create-client.dto";
import { SearchClientDto } from "./dto/search-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@Injectable()
export class ClientsService {
  async create(doc: CreateClientDto) {
    return this.clients.create(doc);
  }

  async findAll(search: SearchClientDto) {
    const { name } = search;
    const filter: FilterQuery<ClientsDocument> = {};
    if (name) filter.name = new RegExp(name, "i");
    return this.clients.find(filter);
  }

  async findOne(id: string) {
    return this.clients.findById(id);
  }

  async update(id: string, doc: UpdateClientDto) {
    return this.clients.findByIdAndUpdate(id, doc);
  }

  async remove(id: string) {
    return this.clients.findByIdAndDelete(id);
  }

  constructor(
    @InjectModel(Clients.name) private readonly clients: Model<ClientsDocument>
  ) { }
}
