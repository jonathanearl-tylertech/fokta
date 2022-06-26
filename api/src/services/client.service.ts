import { Injectable } from "@nestjs/common";

@Injectable()
export class ClientService {
  private readonly clients;

  constructor() {
    this.clients = CLIENTS;
  }

  findOne(clientId: string) {
    const client = this.clients.filter((c) => c.client_id === clientId)[0];
    return client ?? null;
  }

  findAll() {
    return this.clients;
  }
}

export interface OpenidProviderClient {
  client_id: string;
  redirect_uri: string[];
  client_secret: string;
  response_type: string[];
}

export const CLIENTS: OpenidProviderClient[] = [
  {
    client_id: "fig",
    redirect_uri: ["*"],
    client_secret: "secret",
    response_type: ["code"],
  },
  {
    client_id: "openid-provider-admin",
    redirect_uri: ["*"],
    client_secret: "secret",
    response_type: ["code"],
  },
];
