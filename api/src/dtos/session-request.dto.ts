import { ApiProperty } from "@nestjs/swagger";

export class SessionRequestDto {
  @ApiProperty({ type: String })
  sessionToken: string;
}