import { Request, Response } from 'express';
import Stripe from 'stripe';
import * as paymentService from '../service/payment.service';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2025-11-17.clover' });
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export const stripeWebhookHandler = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string | undefined;
  let event: Stripe.Event;

  try {
    // raw body required for signature verification: configure express.json({ verify: ... })
    event = stripe.webhooks.constructEvent((req as any).rawBody, sig!, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return res.status(400).send(`Webhook Error: ${err}`);
  }

  // handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const pi = event.data.object as Stripe.PaymentIntent;
      // metadata.paymentId is the local Payment._id we set previously
      const paymentId = pi.metadata?.paymentId;
      const transactionId = pi.id;
      if (paymentId) {
        await paymentService.updatePaymentStatus(paymentId, 'paid', transactionId);
      }
      break;
    case 'payment_intent.payment_failed':
      const failed = event.data.object as Stripe.PaymentIntent;
      const failedPaymentId = failed.metadata?.paymentId;
      if (failedPaymentId) {
        await paymentService.updatePaymentStatus(failedPaymentId, 'failed', failed.id);
      }
      break;
    // add more events if needed
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
