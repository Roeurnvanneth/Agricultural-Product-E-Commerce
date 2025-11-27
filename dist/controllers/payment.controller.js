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
exports.updateStatusHandler = exports.listPaymentsHandler = exports.getPaymentHandler = exports.createPaymentHandler = void 0;
const paymentService = __importStar(require("../service/payment.service"));
const stripe_1 = __importDefault(require("stripe"));
const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
const stripe = stripeSecret ? new stripe_1.default(stripeSecret) : null;
// Create a payment 
const createPaymentHandler = async (req, res) => {
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
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error', error: String(err) });
    }
};
exports.createPaymentHandler = createPaymentHandler;
const getPaymentHandler = async (req, res) => {
    try {
        const payment = await paymentService.getPaymentById(req.params.id);
        if (!payment)
            return res.status(404).json({ message: 'Payment not found' });
        return res.json(payment);
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.getPaymentHandler = getPaymentHandler;
const listPaymentsHandler = async (req, res) => {
    try {
        const filter = {};
        if (req.query.orderId)
            filter.orderId = req.query.orderId;
        if (req.query.userId)
            filter.userId = req.query.userId;
        const payments = await paymentService.getPayments(filter);
        return res.json(payments);
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.listPaymentsHandler = listPaymentsHandler;
const updateStatusHandler = async (req, res) => {
    try {
        const { status, transactionId } = req.body;
        const updated = await paymentService.updatePaymentStatus(req.params.id, status, transactionId);
        if (!updated)
            return res.status(404).json({ message: 'Payment not found' });
        return res.json(updated);
    }
    catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.updateStatusHandler = updateStatusHandler;
