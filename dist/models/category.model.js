"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: { type: String, reqired: true, unique: true },
    description: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Category", categorySchema);
