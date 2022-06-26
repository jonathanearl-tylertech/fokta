import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  firstName: string;

  @ApiProperty({ type: String })
  _id: string;

  @ApiProperty({ type: String })
  lastName: string;

  @ApiProperty({ type: Date })
  modifiedAt: Date;
}
