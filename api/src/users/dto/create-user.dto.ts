import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String })
  @IsOptional()
  firstName: string;

  @ApiProperty({ type: String })
  @IsOptional()
  lastName: string;

  @ApiProperty({
    required: true,
    type: String,
    minLength: 12,
    maxLength: 256,
  })
  @MinLength(3)
  @MaxLength(256)
  password: string;

  @ApiProperty({
    required: true,
    type: String,
    minLength: 3,
    maxLength: 24,
  })
  @MinLength(3)
  @MaxLength(24)
  username: string;
}
