import { Payment, IPayment } from '../models/Payment';
import mongoose from 'mongoose';
import Stripe from 'stripe';



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover', // updated to match installed Stripe types
});

export default stripe;


export const createPayment = async (payload: {
  orderId: string;
  userId: string;
  amount: number;
  method: string;
}) => {
  const payment = await Payment.create({
    orderId: new mongoose.Types.ObjectId(payload.orderId),
    userId: new mongoose.Types.ObjectId(payload.userId),
    amount: payload.amount,
    method: payload.method,
    status: 'pending'
  });
  return payment;
};

export const getPaymentById = async (id: string) => {
  return Payment.findById(id).populate('userId', 'name email').populate('orderId');
};

export const getPayments = async (filter: any = {}) => {
  return Payment.find(filter).sort({ createdAt: -1 });
};

export const updatePaymentStatus = async (id: string, status: IPayment['status'], transactionId?: string) => {
  const update: any = { status };
  if (transactionId) update.transactionId = transactionId;
  return Payment.findByIdAndUpdate(id, update, { new: true });
};
