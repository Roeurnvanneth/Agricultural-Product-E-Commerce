"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentStatus = exports.getPayments = exports.getPaymentById = exports.createPayment = void 0;
const Payment_1 = require("../models/Payment");
const mongoose_1 = __importDefault(require("mongoose"));
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-11-17.clover', // updated to match installed Stripe types
});
exports.default = stripe;
const createPayment = async (payload) => {
    const payment = await Payment_1.Payment.create({
        orderId: new mongoose_1.default.Types.ObjectId(payload.orderId),
        userId: new mongoose_1.default.Types.ObjectId(payload.userId),
        amount: payload.amount,
        method: payload.method,
        status: 'pending'
    });
    return payment;
};
exports.createPayment = createPayment;
const getPaymentById = async (id) => {
    return Payment_1.Payment.findById(id).populate('userId', 'name email').populate('orderId');
};
exports.getPaymentById = getPaymentById;
const getPayments = async (filter = {}) => {
    return Payment_1.Payment.find(filter).sort({ createdAt: -1 });
};
exports.getPayments = getPayments;
const updatePaymentStatus = async (id, status, transactionId) => {
    const update = { status };
    if (transactionId)
        update.transactionId = transactionId;
    return Payment_1.Payment.findByIdAndUpdate(id, update, { new: true });
};
exports.updatePaymentStatus = updatePaymentStatus;
