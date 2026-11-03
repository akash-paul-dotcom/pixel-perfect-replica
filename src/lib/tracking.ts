/** Privacy-safe event tracking. GA4 + Meta Pixel activate only when their
 * IDs are set in src/config/site.ts; until then events are no-ops. */
import { tracking } from "@/config/site";

type Payload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export type TrackEvent =
  | "form_submit"
  | "call_click"
  | "whatsapp_click"
  | "directions_click"
  | "book_click";

export function trackEvent(event: TrackEvent, payload?: Payload) {
  try {
    if (tracking.gaMeasurementId && typeof window !== "undefined") {
      window.gtag?.("event", event, payload ?? {});
    }
    if (tracking.metaPixelId && typeof window !== "undefined") {
      window.fbq?.("trackCustom", event, payload ?? {});
    }
    // Always visible in local debugging; harmless in production.
    if (import.meta.env.DEV) console.debug("[track]", event, payload ?? {});
  } catch {
    /* tracking must never break the UI */
  }
}
