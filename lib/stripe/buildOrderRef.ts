import { randomBytes } from "crypto";

export function buildOrderRef(): string {
  const suffix = randomBytes(3).toString("hex").toUpperCase();
  return `SCG-${Date.now().toString(36).toUpperCase()}-${suffix}`;
}
