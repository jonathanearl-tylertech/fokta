import { IntersectionType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional } from "class-validator";
import { CreateClientDto } from "./create-client.dto";

export class AdditionalClientInfo {
  @ApiProperty({ type: [String], default: () => [] })
  @IsArray()
  @IsOptional()
  signInRedirectUris: [string];

  @ApiProperty({ type: [String], default: () => [] })
  @IsArray()
  @IsOptional()
  signOutRedirectUris: [string];
}

export class UpdateClientDto extends IntersectionType(
  CreateClientDto,
  AdditionalClientInfo
) {}
