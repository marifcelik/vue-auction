import mongoose, { Document } from 'mongoose';

// TODO: validate schema, maybe use typegoose
export interface IUser {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  pic?: string;
}

export interface IUserModal extends IUser, Document {}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: { type: String }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

export default mongoose.model<IUserModal>('user', userSchema);
