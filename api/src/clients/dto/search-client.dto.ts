import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, MaxLength, MinLength } from "class-validator";

export class SearchClientDto {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @MinLength(1)
  @MaxLength(256)
  name?: string;
}
