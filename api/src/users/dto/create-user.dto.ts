import { ApiProperty } from "@nestjs/swagger";
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
  MinLength,
} from "class-validator";

class Profile {
  @ApiProperty({
    type: String,
    required: true,
    maxLength: 256,
    default: "admin@admin.com",
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(256)
  email: string;

  @ApiProperty({
    type: String,
    required: false,
    maxLength: 256,
    default: "firstname",
  })
  @IsOptional()
  @IsAlpha()
  @MaxLength(256)
  firstName: string;

  @ApiProperty({
    type: String,
    required: false,
    maxLength: 256,
    default: "lastname",
  })
  @IsOptional()
  @IsAlpha()
  @MaxLength(256)
  lastName: string;

  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 256,
    default: "admin@admin.com",
  })
  @MinLength(3)
  @MaxLength(256)
  login: string;

  @ApiProperty({
    type: String,
    default: "555-555-5555",
  })
  @IsOptional()
  @IsPhoneNumber()
  mobilePhone: string;
}

class CredentialValue {
  @ApiProperty({
    type: String,
    required: true,
    default: "passwordpassword",
  })
  @MinLength(3)
  @MaxLength(256)
  value: string;
}

class Credentials {
  @ApiProperty({ type: CredentialValue })
  @IsNotEmptyObject()
  password: CredentialValue;
}

export class CreateUserDto {
  @ApiProperty({ type: Profile })
  @IsNotEmptyObject()
  profile: Profile;

  @ApiProperty({ type: Credentials })
  @IsNotEmptyObject()
  credentials: Credentials;
}
