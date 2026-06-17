/** Best-effort in-memory lock per istanza serverless — complementa metadata Stripe. */
const processing = new Set<string>();

export function isOrderProcessing(sessionId: string): boolean {
  return processing.has(sessionId);
}

export function beginOrderProcessing(sessionId: string): boolean {
  if (processing.has(sessionId)) return false;
  processing.add(sessionId);
  return true;
}

export function endOrderProcessing(sessionId: string): void {
  processing.delete(sessionId);
}
