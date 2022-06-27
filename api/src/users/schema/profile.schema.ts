import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "./user.schema";

@Schema()
export class Profile extends Document {
  @Prop({ type: String, index: true, unique: true })
  email: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String, index: true, unique: true })
  login: string;

  @Prop({ type: String })
  mobilePhone: string;

  @Prop({ type: Types.ObjectId, ref: "User" })
  user: User;
}
export type ProfileDocument = Profile & Document;
export const ProfileSchema = SchemaFactory.createForClass(Profile);
