"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeWebhookHandler = void 0;
const stripe_1 = __importDefault(require("stripe"));
const paymentService = __importStar(require("../service/payment.service"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2025-11-17.clover' });
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
const stripeWebhookHandler = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        // raw body required for signature verification: configure express.json({ verify: ... })
        event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
    }
    catch (err) {
        console.error('Webhook signature verification failed.', err);
        return res.status(400).send(`Webhook Error: ${err}`);
    }
    // handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const pi = event.data.object;
            // metadata.paymentId is the local Payment._id we set previously
            const paymentId = pi.metadata?.paymentId;
            const transactionId = pi.id;
            if (paymentId) {
                await paymentService.updatePaymentStatus(paymentId, 'paid', transactionId);
            }
            break;
        case 'payment_intent.payment_failed':
            const failed = event.data.object;
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
exports.stripeWebhookHandler = stripeWebhookHandler;
