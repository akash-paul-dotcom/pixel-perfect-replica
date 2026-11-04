import { createFileRoute } from "@tanstack/react-router";

import { clinic, faqs } from "@/config/site";
import { SiteHeader, SiteFooter, MobileCtaBar } from "@/components/site/chrome";
import { Hero, TrustStrip } from "@/components/site/hero";
import {
  About,
  Faq,
  HowItWorks,
  Location,
  Reviews,
  Services,
  WhyUs,
} from "@/components/site/sections";
import { BookingForm } from "@/components/site/booking-form";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: `${clinic.name} — ${doctorTitle()} in Siliguri`,
      },
      {
        name: "description",
        content:
          "MDS-qualified dentist in Kadamtala, Siliguri. Gentle, painless treatment, sterilised instruments and a calm homely clinic near N.B.U. 4.8★ on Google. Call or WhatsApp to book.",
      },
      { property: "og:title", content: "Ray Dental Care — Dr. Rishi Ray, MDS · Dentist in Siliguri" },
      {
        property: "og:description",
        content:
          "Gentle, precise dental care minutes from N.B.U., Siliguri. Book by call, WhatsApp or the appointment form.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ray Dental Care — Dr. Rishi Ray, MDS · Siliguri" },
      {
        name: "twitter:description",
        content: "MDS-qualified, gentle dental care in Kadamtala, Siliguri. 4.8★ on Google.",
      },
    ],
    scripts: [clinicJsonLd(), faqJsonLd()],
  }),
  component: Index,
});

function doctorTitle() {
  return "Dentist & Prosthodontist";
}

function clinicJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinic.name,
    telephone: clinic.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${clinic.address.line1}, ${clinic.address.line2}`,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.state,
      postalCode: clinic.address.pin,
      addressCountry: "IN",
    },
    sameAs: [clinic.instagram, clinic.facebook],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: clinic.rating.value,
      reviewCount: clinic.rating.count,
    },
  };
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

function faqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <Hero />
        <div className="pt-10">
          <TrustStrip />
        </div>
        <Services />
        <WhyUs />
        <About />
        <Reviews />
        <HowItWorks />
        <Faq />
        <BookingForm />
        <Location />
      </main>
      <SiteFooter />
      <MobileCtaBar />
    </div>
  );
}
