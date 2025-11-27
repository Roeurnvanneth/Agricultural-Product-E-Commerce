"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeUser = void 0;
const sanitizeUser = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        status: user.status,
    };
};
exports.sanitizeUser = sanitizeUser;
