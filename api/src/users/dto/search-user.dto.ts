import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class SearchUserDto {
  @ApiProperty({ type: String })
  @IsOptional()
  email?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  firstName?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  lastName?: string;

  @ApiProperty({ type: Number, default: 10 })
  @IsOptional()
  limit?: number;

  @ApiProperty({ type: Number, default: 0 })
  @IsOptional()
  skip?: number;
}
