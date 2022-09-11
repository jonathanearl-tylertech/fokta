import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from "class-validator";

export class UpdateClientDto {
  @ApiProperty({ type: Date })
  @IsOptional()
  @IsDate()
  client_secret_expires_at: Date;

  @ApiProperty({ type: String })
  @MinLength(3)
  @MaxLength(256)
  @IsNotEmpty()
  client_name: string;

  @ApiProperty({ type: String })
  client_uri: string;

  @ApiProperty({ type: String, isArray: true })
  grant_types: [string];

  @ApiProperty({ type: String, isArray: true })
  post_logout_redirect_uris: [string];

  @ApiProperty({ type: String, isArray: true })
  redirect_uris: [string];

  @ApiProperty({ type: String, isArray: true })
  response_types: [string];

  @ApiProperty({ type: String })
  token_endpoint_auth_method: string;
}
