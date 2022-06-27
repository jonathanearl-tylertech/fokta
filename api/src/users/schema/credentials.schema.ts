import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Credentials extends Document {
  @Prop({ type: String })
  algorithm: string;

  @Prop({ type: String })
  value: string;

  @Prop({ type: Number })
  workFactor: number;
}
export type CredentialsDocument = Credentials & Document;
export const CredentialsSchema = SchemaFactory.createForClass(Credentials);
