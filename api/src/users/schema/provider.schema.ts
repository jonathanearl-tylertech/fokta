import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class Provider extends Document {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String, index: true, unique: true })
  type: string;
}
export type ProviderDocument = Provider & Document;
export const ProviderSchema = SchemaFactory.createForClass(Provider);
