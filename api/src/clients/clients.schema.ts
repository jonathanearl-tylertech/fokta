import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export type ClientsDocument = Clients & Document;

@Schema({ timestamps: true })
export class Clients extends Document {
  @Prop({ type: Boolean })
  allowAuthorizationCodeFlow: boolean;

  @Prop({ type: Boolean })
  allowClientCredentialFlow: boolean;

  @Prop({ type: String })
  clientId: string;

  @Prop({ type: String })
  clientSecret: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: String, default: () => uuidv4() })
  _id: string;

  @Prop({ type: Date })
  modifiedAt: Date;

  @Prop({ type: String })
  name: string;

  @Prop({ type: [String] })
  signInRedirectUris: [string];

  @Prop({ type: [String] })
  signOutRedirectUris: [string];
}

export const ClientsSchema = SchemaFactory.createForClass(Clients);
