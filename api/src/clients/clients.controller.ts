import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ClientsService } from "./clients.service";
import { ClientDto } from "./dto/client.dto";
import { CreateClientDto } from "./dto/create-client.dto";
import { SearchClientDto } from "./dto/search-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";

@ApiTags('clients')
@Controller('api/v1/clients')
export class ClientsController {
  @Post()
  @ApiOkResponse({ type: ClientDto })
  create(@Body() doc: CreateClientDto) {
    console.log(doc);
    return this.clientsService.create(doc);
  }

  @Get()
  @ApiOkResponse({ type: ClientDto, isArray: true })
  findAll(@Query() query: SearchClientDto) {
    return this.clientsService.findAll(query);
  }

  @Get(":id")
  @ApiOkResponse({ type: ClientDto })
  findOne(@Param("id") id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(":id")
  @ApiOkResponse({ type: ClientDto })
  update(@Param("id") id: string, @Body() doc: UpdateClientDto) {
    console.log(doc);
    return this.clientsService.update(id, doc);
  }

  @Delete(":id")
  @ApiNoContentResponse()
  remove(@Param("id") id: string) {
    return this.clientsService.remove(id);
  }

  constructor(private readonly clientsService: ClientsService) { }
}
