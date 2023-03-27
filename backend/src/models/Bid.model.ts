import mongoose, { Document, Schema } from 'mongoose';

export interface IBid {
  userId: Schema.Types.ObjectId | number;
  productId: number;
  price: number;
}

export interface IBidModal extends IBid, Document {}

const bidSchema = new Schema<IBid>(
  {
    userId: { type: Number, required: true },
    productId: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IBidModal>('Bid', bidSchema);
