"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordMin = exports.isEmail = void 0;
// src/utils/validate.ts
const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
exports.isEmail = isEmail;
const passwordMin = (s) => s.length >= 6;
exports.passwordMin = passwordMin;
