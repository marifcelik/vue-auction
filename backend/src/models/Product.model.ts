import mongoose, { Document, Schema } from 'mongoose';

// TODO: validate schema, maybe use typegoose
export interface IProduct {
	name: string;
	userId: Schema.Types.ObjectId;
	basePrice: number;
	sold: boolean;
	description?: string;
	photo: string
}

export interface IProductModal extends IProduct, Document { }

const productSchema = new Schema<IProduct>(
	{
		name: { type: String, required: true },
		userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
		basePrice: { type: Number, required: true },
		sold: { type: Boolean, default: false },
		description: String,
		photo: { type: String, required: true }
	},
	{ timestamps: true }
);

export default mongoose.model<IProductModal>('Product', productSchema);
