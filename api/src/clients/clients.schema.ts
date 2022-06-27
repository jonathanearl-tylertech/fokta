import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

@Schema({ timestamps: true })
export class Clients extends Document {
  @Prop({ type: String })
  application_type: string;

  @Prop({ type: Date })
  client_id_issued_at: Date;

  @Prop({ type: String })
  client_name: string;

  @Prop({ type: String })
  client_secret: string;

  @Prop({ type: Date })
  client_secret_expires_at: Date;

  @Prop({ type: String })
  client_uri: string;

  @Prop({ typeSchema: Date })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, select: false,  })
  _id: string;

  @Prop({ type: Date })
  modifiedAt: Date;

  @Prop({ type: String })
  name: string;

  @Prop({ type: [String] })
  post_logout_redirect_uris: [string];

  @Prop({ type: [String] })
  redirect_uris: [string];

  @Prop({ type: [String] })
  response_types: [string];

  @Prop({ type: String })
  token_endpoint_auth_method

  @Prop({ type: [String] })
  grant_types: [string];
}
export type ClientsDocument = Clients & Document;
export const ClientsSchema = SchemaFactory.createForClass(Clients);
