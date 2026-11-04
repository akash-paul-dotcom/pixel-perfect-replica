import { ArrowRight, MessageCircle, Phone, Star } from "lucide-react";

import { clinic, hero, trustStrip } from "@/config/site";
import { trackEvent } from "@/lib/tracking";
import { waLink } from "@/components/site/chrome";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0">
        <img
          src={hero.background}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/35 to-background" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-24 sm:pt-28">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div className="glass max-w-xl rounded-3xl p-6 sm:p-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Star className="h-3.5 w-3.5 fill-current" />
              {hero.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
              {hero.headline}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {hero.subheadline}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {hero.chips.map((chip) => (
                <li
                  key={chip}
                  className="glass-soft rounded-full px-3 py-1.5 text-xs font-semibold text-foreground"
                >
                  {chip}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "hero" })}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/30 transition hover:brightness-105 active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                Book on WhatsApp
              </a>
              <a
                href={`tel:${clinic.phoneE164}`}
                onClick={() => trackEvent("call_click", { source: "hero" })}
                className="glass-soft inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold text-foreground transition hover:bg-background/70"
              >
                <Phone className="h-5 w-5 text-primary" />
                {clinic.phoneDisplay}
              </a>
            </div>
            <a
              href="#book"
              onClick={() => trackEvent("book_click", { source: "hero" })}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Or request a callback
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <img
            src={hero.portrait}
            alt="Dr. Rishi Ray, MDS — Dental Surgeon & Prosthodontist"
            className="mx-auto h-72 w-auto object-contain drop-shadow-2xl sm:h-96 lg:-mb-6 lg:h-[30rem]"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  return (
    <section aria-label="Why patients trust us" className="mx-auto max-w-6xl px-4">
      <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-3xl sm:grid-cols-4">
        {trustStrip.stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 px-4 py-5 text-center"
          >
            <span className="font-display text-2xl font-semibold text-primary sm:text-3xl">
              {stat.value != null
                ? stat.value.toFixed(stat.decimals ?? 0) + (stat.suffix ?? "")
                : stat.text}
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
