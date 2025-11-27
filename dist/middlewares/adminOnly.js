"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = void 0;
const adminOnly = (req, res, next) => {
    if (!req.user || req.user.roles !== "admin") {
        return res.status(403).json({ message: "Admin only access denied" });
    }
    next();
};
exports.adminOnly = adminOnly;
