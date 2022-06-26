import { ApiProperty } from "@nestjs/swagger";

export class ClientDto {
  @ApiProperty({ type: Boolean })
  allowAuthorizationCodeFlow: boolean;

  @ApiProperty({ type: Boolean })
  allowClientCredentialFlow: boolean;

  @ApiProperty({ type: String })
  clientId: string;

  @ApiProperty({ type: String })
  clientSecret: string;
  
  @ApiProperty({ type: String })
  _id: string;

  @ApiProperty({ type: Date })
  modifiedAt: Date;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: [String] })
  signInRedirectUris: [string];

  @ApiProperty({ type: [String] })
  signOutRedirectUris: [string];

  @ApiProperty( { type: Number, description: 'version' })
  __v: number;
}
