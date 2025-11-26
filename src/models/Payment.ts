import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  orderId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  amount: number;
  method: string;           //  "stripe", "card", "cash", "paypal","aba","wings"
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true,unique: true },
  userId:  { type: Schema.Types.ObjectId, ref: 'User', required: true,unique: true },
  amount:  { type: Number, required: true },
  method:  { type: String, required: true },
  status:  { type: String, enum: ['pending','paid','failed','refunded'], default: 'pending' },
  transactionId: { type: String },
  createdAt: { type: Date, default: () => new Date() }
});

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
