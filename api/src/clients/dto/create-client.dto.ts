import { ApiProperty } from "@nestjs/swagger";
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import { ContainsRule } from "../validators/contains.rule";

export class CreateClientDto {
  @ApiProperty({ type: String, required: true, default: 'web' })
  @IsNotEmpty()
  @IsAlphanumeric()
  @Validate(ContainsRule, ['web'])
  application_type: string;

  @ApiProperty({ type: String, required: true, default: 'client name' })
  @MinLength(3)
  @MaxLength(256)
  @IsNotEmpty()
  client_name: string;

  @ApiProperty({ type: String, default: 'http://localhost:5000' })
  @IsOptional()
  @IsUrl({ require_tld: false })
  client_uri: string;

  @ApiProperty({ type: String, isArray: true, default: ['*'] })
  @IsOptional()
  redirect_uris: [string];

  @ApiProperty({ type: String, isArray: true, default: ['*'] })
  @IsOptional()
  post_logout_redirect_uris: [string];

  @ApiProperty({ type: String, isArray: true, default: ['code'] })
  @IsNotEmpty()
  @Validate(ContainsRule, ['code'])
  response_types: [string];

  @ApiProperty({ type: String, isArray: true, default: ['authorization_code'] })
  @IsNotEmpty()
  @Validate(ContainsRule, ['authorization_code'])
  grant_types: [string];

  @ApiProperty({ type: String, required: true, default: 'client_secret_post' })
  @IsNotEmpty()
  @Validate(ContainsRule, ['client_secret_post']) 
  token_endpoint_auth_method: string;
}
