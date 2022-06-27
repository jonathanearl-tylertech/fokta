import { ApiProperty } from "@nestjs/swagger";

export class ClientDto {
  @ApiProperty({ type: String })
  application_type: string;

  @ApiProperty({ type: String })
  client_id: string;

  @ApiProperty({ type: Date })
  client_id_issued_at: Date;

  @ApiProperty({ type: String })
  client_secret: string;

  @ApiProperty({ type: Date })
  client_secret_expires_at: Date;

  @ApiProperty({ type: String })
  client_name: string;

  @ApiProperty({ type: String })
  client_uri: string;

  @ApiProperty({ type: String, isArray: true })
  redirect_uris: [string];

  @ApiProperty({ type: String, isArray: true })
  post_logout_redirect_uris: [string];

  @ApiProperty({ type: String, isArray: true })
  response_types: [string];

  @ApiProperty({ type: String, isArray: true })
  grant_types: [string];

  @ApiProperty({ type: String })
  token_endpoint_auth_method: string;
}
