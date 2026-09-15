/**
 * Tracking mínimo: empuja eventos al dataLayer, listos para GTM/GA4 cuando el
 * cliente configure su contenedor. Sin contenedor, los eventos quedan en el
 * dataLayer sin efecto (no rompen nada).
 */
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: string, params: Params = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
