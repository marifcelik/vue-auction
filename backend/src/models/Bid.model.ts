import mongoose, { Document, Schema } from 'mongoose';

// TODO: validate schema, maybe use typegoose
export interface IOffer {
  userId: Schema.Types.ObjectId;
  productId: number;
  price: number;
}

export interface IOfferModal extends IOffer, Document {}

const userSchema = new Schema<IOffer>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    productId: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IOfferModal>('offer', userSchema);
