import { randomBytes } from "crypto";

export function generateSecureToken(): string {
  return randomBytes(32).toString("hex");
}

export function generateRefreshToken(): string {
  return randomBytes(64).toString("hex");
}
