import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsBoolean, MaxLength, MinLength } from "class-validator";

export class CreateClientDto {
  @ApiProperty({ type: Boolean, required: true })
  @IsBoolean()
  allowAuthorizationCodeFlow: boolean;

  @ApiProperty({ type: Boolean, required: true })
  @IsBoolean()
  allowClientCredentialFlow: boolean;

  @ApiProperty({ type: String, required: false })
  @MinLength(3)
  @MaxLength(256)
  @IsAlphanumeric()
  name: string;
}
