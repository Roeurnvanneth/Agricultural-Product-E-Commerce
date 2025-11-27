import { Request, Response } from 'express';
import * as paymentService from '../service/payment.service';
import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripe = stripeSecret ? new Stripe(stripeSecret) : null;

// Create a payment 
export const createPaymentHandler = async (req: Request, res: Response) => {
  try {
    const { orderId, userId, amount, method } = req.body;
    if (!orderId || !userId || !amount || !method) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    // 1) Create local Payment record (status = pending)
    const payment = await paymentService.createPayment({ orderId, userId, amount, method });

    // 2) If method === 'stripe' create PaymentIntent and return client_secret to client
    if (method === 'stripe' && stripe) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // cents
        currency: 'usd',
        metadata: { paymentId: String(payment._id), orderId },
      });
      return res.status(201).json({ payment, clientSecret: paymentIntent.client_secret });
    }

    // For non-Stripe flows, just return payment record
    return res.status(201).json({ payment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: String(err) });
  }
};

export const getPaymentHandler = async (req: Request, res: Response) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    return res.json(payment);
  } catch (err) { return res.status(500).json({ message: 'Server error' }); }
};

export const listPaymentsHandler = async (req: Request, res: Response) => {
  try {
    const filter: any = {};
    if (req.query.orderId) filter.orderId = req.query.orderId;
    if (req.query.userId) filter.userId = req.query.userId;
    const payments = await paymentService.getPayments(filter);
    return res.json(payments);
  } catch (err) { return res.status(500).json({ message: 'Server error' }); }
};

export const updateStatusHandler = async (req: Request, res: Response) => {
  try {
    const { status, transactionId } = req.body;
    const updated = await paymentService.updatePaymentStatus(req.params.id, status, transactionId);
    if (!updated) return res.status(404).json({ message: 'Payment not found' });
    return res.json(updated);
  } catch (err) { return res.status(500).json({ message: 'Server error' }); }
};
