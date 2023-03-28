import mongoose, { Document, Schema } from 'mongoose';

export interface IBid {
  userId: Schema.Types.ObjectId;
  productId: number;
  price: number;
}

export interface SerializedBid extends IBid {
  username: string
  id: string
}

export interface IBidModal extends IBid, Document { }

const bidSchema = new Schema<IBid>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    productId: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IBidModal>('Bid', bidSchema);
