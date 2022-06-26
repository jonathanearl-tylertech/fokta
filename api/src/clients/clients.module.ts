import { Module } from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { ClientsController } from "./clients.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Clients, ClientsSchema } from "./clients.schema";

@Module({
  controllers: [ClientsController],
  imports: [
    MongooseModule.forFeature([{ name: Clients.name, schema: ClientsSchema }]),
  ],
  providers: [ClientsService],
})
export class ClientsModule {}
