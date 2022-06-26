import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String })
  createdAt: Date;

  @Prop({ type: String, required: true, index: true, unique: true })
  email: string;

  @Prop({ type: String})
  firstName: string;

  @Prop({ type: String, default: () => uuidv4() })
  _id: string;

  @Prop({ type: String})
  lastName: string;

  @Prop({ type: String })
  modifiedAt: Date;

  @Prop({ type: String, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
