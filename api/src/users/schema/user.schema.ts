import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Credentials } from "./credentials.schema";
import { Profile } from "./profile.schema";
import { Provider } from "./provider.schema";

@Schema()
export class User extends Document {
  @Prop({ type: Types.ObjectId })
  _id: string;

  @Prop({ type: Date })
  activated: Date;

  @Prop({ type: String })
  created: Date;

  @Prop({ type: Types.ObjectId, ref: "Credentials" })
  credentials: Credentials;

  @Prop({ type: Date })
  lastUpdated: Date;

  @Prop({ type: Types.ObjectId, ref: "Profile" })
  profile: Profile;

  @Prop({ type: Types.ObjectId, ref: "Provider" })
  provider: Provider;

  @Prop({ type: Date })
  passwordChanged: Date;

  @Prop({ type: String })
  status: string;

  @Prop({ type: Date })
  statusChanged: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
