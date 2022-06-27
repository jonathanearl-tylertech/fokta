import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseFilters,
  NotFoundException,
} from "@nestjs/common";
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { MongoExceptionFilter } from "src/filters/mongo-exception.filter";
import { Clients } from "./clients.schema";
import { ClientsService } from "./clients.service";
import { ClientDto } from "./dto/client.dto";
import { CreateClientDto } from "./dto/create-client.dto";
import { SearchClientDto } from "./dto/search-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@ApiTags("clients")
@Controller("api/v1/clients")
@UseFilters(MongoExceptionFilter)
export class ClientsController {
  @Post()
  @ApiOkResponse({ type: ClientDto })
  async create(@Body() body: CreateClientDto) {
    const client = await this.clientsService.create(body);
    return this.clientToDto(client);
  }

  @Get()
  @ApiOkResponse({ type: ClientDto, isArray: true })
  async findAll(@Query() query: SearchClientDto) {
    const clients = await this.clientsService.findAll(query);
    return clients.map(c => this.clientToDto(c));
  }

  @Get(":id")
  @ApiOkResponse({ type: ClientDto })
  async findOne(@Param("id") id: string) {
    const client = await this.clientsService.findOne(id);
    if (!client)
      throw new NotFoundException(id);
    return this.clientToDto(client);
  }

  @Patch(":id")
  @ApiOkResponse({ type: ClientDto })
  async update(@Param("id") id: string, @Body() body: UpdateClientDto) {
    const client = await this.clientsService.update(id, body as Clients);
    return this.clientToDto(client);
  }

  @Delete(":id")
  @ApiNoContentResponse()
  async remove(@Param("id") id: string) {
    const client = this.clientsService.remove(id);
    if (!client)
      throw new NotFoundException(id);
  }

  clientToDto(client: Clients) {
    return {
      application_type: client.application_type,
      client_id: client._id,
      client_id_issued_at: client.client_id_issued_at,
      client_name: client.client_name,
      client_uri: client.client_uri,
      client_secret: client.client_secret,
      client_secret_expires_at: client.client_secret_expires_at,
      redirect_uris: [...client.redirect_uris],
      post_logout_redirect_uris: [...client.post_logout_redirect_uris],
      response_types: [...client.response_types],
      grant_types: [...client.grant_types],
      token_endpoint_auth_method: client.token_endpoint_auth_method,
    } as ClientDto;
  }
  constructor(private readonly clientsService: ClientsService) {}
}
