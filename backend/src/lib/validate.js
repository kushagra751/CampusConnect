// Small input validation helpers (also guards against NoSQL operator injection
// by requiring plain strings instead of objects).
export const isString = (v) => typeof v === "string";

export const cleanEmail = (v) =>
  isString(v) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) && v.length <= 254
    ? v.trim().toLowerCase()
    : null;

export const validPassword = (v) => isString(v) && v.length >= 6 && v.length <= 128;
