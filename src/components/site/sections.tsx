import type { ReactNode } from "react";
import {
  AlignCenterHorizontal,
  Anchor,
  Baby,
  CircleMinus,
  Clock,
  Crown,
  Facebook,
  Heart,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smile,
  Sparkles,
  WandSparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { aboutImages, clinic, faqs, hours, images, reviews, services, whyChooseUs, howItWorks, doctor } from "@/config/site";
import { trackEvent } from "@/lib/tracking";
import { waLink } from "@/components/site/chrome";

const serviceIcons: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  zap: Zap,
  anchor: Anchor,
  crown: Crown,
  smile: Smile,
  align: AlignCenterHorizontal,
  "circle-minus": CircleMinus,
  wand: WandSparkles,
  baby: Baby,
};

const whyIcons: LucideIcon[] = [Heart, Sparkles, ShieldCheck, MapPin];

function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {sub ? <p className="mt-3 text-sm text-muted-foreground sm:text-base">{sub}</p> : null}
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="section-anchor mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <SectionHeader
        eyebrow="Treatments"
        title="Everything your smile needs, under one roof"
        sub="From a gentle clean to full smile restorations — planned honestly, priced clearly."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = serviceIcons[service.icon] ?? Sparkles;
          return (
            <a
              key={service.id}
              href="#book"
              onClick={() => trackEvent("book_click", { source: `service:${service.id}` })}
              className="glass group rounded-2xl p-5 transition hover:-translate-y-0.5"
            >
              <span className="inline-flex rounded-xl bg-primary/10 p-3 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-foreground">{service.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {service.benefit}
              </p>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
      <SectionHeader
        eyebrow="Why patients choose us"
        title="Care that feels calm, not clinical"
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {whyChooseUs.map((item, i) => {
          const Icon = whyIcons[i % whyIcons.length];
          return (
            <div key={item.title} className="glass-soft rounded-2xl p-5">
              <span className="inline-flex rounded-full bg-accent/15 p-2.5 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 font-semibold">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section-anchor mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="relative">
          <img
            src={aboutImages.clinicInterior}
            alt="Inside Ray Dental Care — a calm, modern clinic"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
            loading="lazy"
          />
          <img
            src={aboutImages.dentistAtWork}
            alt="Dr. Rishi Ray at work"
            className="glass absolute -bottom-6 -right-2 hidden h-36 w-48 rounded-2xl object-cover sm:block"
            loading="lazy"
          />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Meet your dentist
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {doctor.name}, {doctor.degree}
          </h2>
          <p className="mt-1 text-sm font-semibold text-primary">{doctor.specialisation}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{doctor.bio}</p>
          <blockquote className="glass mt-6 rounded-2xl border-l-4 border-l-accent p-4 text-sm font-medium italic text-foreground">
            “{doctor.philosophy}”
          </blockquote>
          <div className="mt-6 flex gap-3">
            <img
              src={aboutImages.doctorPortrait}
              alt="Dr. Rishi Ray at the clinic"
              className="h-20 w-20 rounded-2xl object-cover shadow-md"
              loading="lazy"
            />
            <img
              src={aboutImages.doctorConference}
              alt="Dr. Rishi Ray at a professional conference"
              className="h-20 w-20 rounded-2xl object-cover shadow-md"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { src: images.sterilisation, alt: "Sterilised instruments, ready for every patient" },
          { src: images.treatmentRoom, alt: "A quiet, homely treatment room" },
          { src: images.dentalChair, alt: "Modern dental chair and equipment" },
        ].map((img) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className="aspect-[3/2] w-full rounded-2xl object-cover shadow-md"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="section-anchor mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <SectionHeader
        eyebrow="Patient stories"
        title={`${clinic.rating.value}★ from ${clinic.rating.count} Google reviews`}
        sub="Real words from real patients — the kind of care people come back for."
      />
      <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
        {reviews.map((review) => (
          <figure
            key={review.name}
            className="glass min-w-[80%] snap-center rounded-2xl p-5 sm:min-w-[45%] lg:min-w-0"
          >
            <div className="flex gap-0.5 text-accent" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                  <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 14.9l-5.3 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                </svg>
              ))}
            </div>
            <blockquote className="mt-3 text-sm leading-relaxed text-foreground">
              {review.text}
            </blockquote>
            <figcaption className="mt-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {review.name}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-2 text-center">
        <a
          href={clinic.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Read all reviews on Google
        </a>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
      <SectionHeader
        eyebrow="Getting started"
        title="Three simple steps to a healthier smile"
      />
      <ol className="mt-10 grid gap-4 sm:grid-cols-3">
        {howItWorks.map((step) => (
          <li key={step.step} className="glass relative rounded-2xl p-5">
            <span className="font-display absolute -top-4 left-5 text-5xl font-semibold text-primary/25">
              {step.step}
            </span>
            <h3 className="mt-6 font-semibold">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="section-anchor mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <SectionHeader eyebrow="Questions" title="Good to know before you visit" />
      <Accordion type="single" collapsible className="mt-10 space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={faq.q}
            value={`faq-${i}`}
            className="glass rounded-2xl border-none px-5"
          >
            <AccordionTrigger className="py-4 text-left text-sm font-semibold sm:text-base hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function Location() {
  return (
    <section
      id="visit"
      className="section-anchor mx-auto max-w-6xl px-4 py-16 sm:py-20"
    >
      <SectionHeader
        eyebrow="Find us"
        title="A quiet clinic, minutes from N.B.U."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="glass overflow-hidden rounded-3xl">
          <iframe
            title={`Map showing ${clinic.name}`}
            src={clinic.mapsEmbedUrl}
            className="aspect-[4/3] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <div className="glass rounded-3xl p-6">
          <h3 className="font-display text-xl font-semibold">{clinic.name}</h3>
          <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>
              {clinic.address.line1}, {clinic.address.line2},{" "}
              {clinic.address.city}, {clinic.address.state} — {clinic.address.pin}
              <span className="mt-1 block text-xs">Plus code: {clinic.address.plusCode}</span>
            </span>
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {hours.map((h) => (
              <li key={h.days} className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-primary" />
                <span className="font-medium">{h.days}</span>
                <span className="text-muted-foreground">· {h.time}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${clinic.phoneE164}`}
              onClick={() => trackEvent("call_click", { source: "location" })}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
            >
              <Phone className="h-4 w-4" /> Call the clinic
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "location" })}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/30 bg-background/70 px-5 py-3 text-sm font-bold text-primary transition hover:bg-background"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={clinic.mapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("directions_click", { source: "location" })}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-background/70 px-5 py-3 text-sm font-bold text-foreground transition hover:bg-background"
            >
              <MapPin className="h-4 w-4" /> Directions
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4 border-t border-border/60 pt-4 text-sm">
            <a
              href={clinic.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a
              href={clinic.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary"
            >
              <Facebook className="h-4 w-4" /> Facebook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4">{children}</div>;
}
