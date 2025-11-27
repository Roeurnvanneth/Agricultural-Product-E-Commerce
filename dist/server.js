"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const user_routes_2 = __importDefault(require("./routes/user.routes"));
const userrole_routes_1 = __importDefault(require("./routes/userrole.routes"));
const swagger_1 = require("./config/swagger");
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const stripe_webhook_1 = require("./controllers/stripe.webhook");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const startServer = async () => {
    try {
        await (0, db_1.default)();
        app.use("/api/auth", user_routes_1.default);
        app.use("/api/farmers", user_routes_2.default);
        app.use("/api/userroles", userrole_routes_1.default);
        app.use("/api/products", product_routes_1.default);
        app.use("/api/orders", order_routes_1.default);
        app.use('/api/payments', payment_routes_1.default);
        app.post('/webhook/stripe', stripe_webhook_1.stripeWebhookHandler);
        (0, swagger_1.swaggerDocs)(app);
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
