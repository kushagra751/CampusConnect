
import { randomInt } from "crypto";

export function OTP() {
  return randomInt(1000, 10000);
}
