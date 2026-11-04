import { useEffect, useState } from "react";
import { Facebook, Instagram, MapPin, MessageCircle, Phone, PhoneCall } from "lucide-react";

import { clinic } from "@/config/site";
import { trackEvent } from "@/lib/tracking";
import brandMark from "@/assets/brand-mark.png";

export function waLink(text?: string) {
  return `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(
    text ?? clinic.whatsappGreeting,
  )}`;
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "glass" : "glass-soft"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <img
            src={brandMark}
            alt=""
            className="h-9 w-9 rounded-full object-cover ring-2 ring-primary/20"
          />
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold text-foreground">
              {clinic.name}
            </span>
            <span className="block text-[11px] font-medium text-muted-foreground">
              Dr. Rishi Ray, MDS · Siliguri
            </span>
          </span>
        </a>
        <a
          href={`tel:${clinic.phoneE164}`}
          onClick={() => trackEvent("call_click", { source: "header" })}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 sm:px-4"
        >
          <Phone className="h-4 w-4" />
          <span className="hidden sm:inline">Call</span>
        </a>
      </div>
    </header>
  );
}

export function MobileCtaBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="glass fixed inset-x-3 bottom-3 z-50 flex items-center gap-2 rounded-2xl p-2 md:hidden"
    >
      <a
        href={`tel:${clinic.phoneE164}`}
        onClick={() => trackEvent("call_click", { source: "cta_bar" })}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-3 py-3 text-sm font-semibold text-primary-foreground"
      >
        <PhoneCall className="h-4 w-4" /> Call
      </a>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", { source: "cta_bar" })}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-3 py-3 text-sm font-semibold text-accent-foreground"
      >
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>
      <a
        href="#book"
        onClick={() => trackEvent("book_click", { source: "cta_bar" })}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/30 bg-background/80 px-3 py-3 text-sm font-semibold text-primary"
      >
        Book
      </a>
    </nav>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="glass-soft section-anchor mt-0 border-t border-border/60 pb-28 pt-10 md:pb-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <img
                src={brandMark}
                alt=""
                className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
              />
              <div>
                <p className="font-display text-lg font-semibold">{clinic.name}</p>
                <p className="text-xs text-muted-foreground">{clinic.nameHi}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{clinic.tagline}</p>
            <div className="mt-4 flex gap-3">
              <a
                href={clinic.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-border bg-background/70 p-2.5 text-muted-foreground transition hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={clinic.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full border border-border bg-background/70 p-2.5 text-muted-foreground transition hover:text-primary"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="rounded-full border border-border bg-background/70 p-2.5 text-muted-foreground transition hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold">Visit us</p>
              <address className="mt-3 space-y-1 text-sm not-italic text-muted-foreground">
                <span className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    {clinic.address.line1}, {clinic.address.line2}
                    <br />
                    {clinic.address.city}, {clinic.address.state} {clinic.address.pin}
                  </span>
                </span>
              </address>
              <a
                href={clinic.mapsShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("directions_click", { source: "footer" })}
                className="mt-3 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                Get directions
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold">Talk to us</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href={`tel:${clinic.phoneE164}`} className="hover:text-primary">
                    {clinic.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    WhatsApp the clinic
                  </a>
                </li>
                <li className="pt-2 text-xs">
                  Mon–Sat from 6:00 PM · Sunday on request
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-5 text-center text-xs text-muted-foreground">
          © {year} {clinic.name} · {doctorLine()}
        </div>
      </div>
    </footer>
  );
}

function doctorLine() {
  return "Dr. Rishi Ray, MDS — Dental Surgeon & Prosthodontist";
}
