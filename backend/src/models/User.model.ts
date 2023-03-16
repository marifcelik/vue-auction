import mongoose from 'mongoose';

// TODO: validate schema, maybe use typegoose
interface IUser {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  pic?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pic: { type: String },
});

export default mongoose.model('user', userSchema);
