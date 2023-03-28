import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt'

export interface IUser {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserModal extends IUser, Document { }

interface IUserModalModel extends Model<IUserModal> {
  login(username: string, password: string): Promise<Document>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

userSchema.pre('save', async function name(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.statics.login = async function (username: string, password: string) {
  const user = await this.findOne({ username })
  if (!user) throw new Error('user not found',);

  const data = await bcrypt.compare(password, user.password);
  if (!data) throw new Error('password is incorrect');

  return { id: user._id, username: user.username }
}

export default mongoose.model<IUserModal, IUserModalModel>('User', userSchema);
