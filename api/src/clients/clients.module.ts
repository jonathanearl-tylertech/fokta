import { Module } from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { ClientsController } from "./clients.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Clients, ClientsSchema } from "./clients.schema";
import { Uuid } from "src/services/uuid.service";

@Module({
  controllers: [ClientsController],
  imports: [
    MongooseModule.forFeature([{ name: Clients.name, schema: ClientsSchema }]),
  ],
  providers: [ClientsService, Uuid],
})
export class ClientsModule {}
