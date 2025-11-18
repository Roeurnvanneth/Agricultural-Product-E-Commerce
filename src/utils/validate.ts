// src/utils/validate.ts
export const isEmail = (s: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export const passwordMin = (s: string) => s.length >= 6;
