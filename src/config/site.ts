/**
 * ============================================================
 *  RAY DENTAL CARE — SINGLE SOURCE OF TRUTH
 *  Edit ALL text, images, services, FAQs, reviews, hours and
 *  contact details here. Every section of the site reads from
 *  this file, so a change here updates the whole site.
 * ============================================================
 */

/* ----------------------------------------------
 * IMAGE CREDITS (all free-licence, Unsplash)
 * Swap any URL below to replace that image site-wide.
 * Photographers are visible on each photo's page:
 *   https://unsplash.com/photos/<id>
 *
 * 1. Clinic interior — https://unsplash.com/photos/photo-1588776814546-1ffcf47267a5
 * 2. Sterilised instrument tray — https://unsplash.com/photos/photo-1629909613654-28e377c37b09
 * 3. Dental chair & equipment — https://unsplash.com/photos/photo-1598256989800-fe5f95da9787
 * 4. Dentist at work — https://unsplash.com/photos/photo-1606811841689-23dfddce3e95
 * 5. Treatment room — https://unsplash.com/photos/photo-1588776813677-77aaf5595b83
 *
 * Doctor photos (supplied): see src/assets/*.asset.json —
 * replace by regenerating the asset or swapping the import.
 * ---------------------------------------------- */

import clinicBg from "@/assets/hero-bg.jpg";
import drRishiCutout from "@/assets/dr-rishi-cutout.png";
import drRishiClinic from "@/assets/dr-rishi-clinic.jpg.asset.json";
import drRishiConference from "@/assets/dr-rishi-conference.jpg.asset.json";
import brandMark from "@/assets/brand-mark.png";

export const clinic = {
  name: "Ray Dental Care",
  nameHi: "राय डेंटल केयर – डॉ ऋषि राय एमडीएस",
  tagline: "Gentle, precise, modern dental care in Siliguri",
  phoneDisplay: "+91 96144 07352",
  phoneE164: "+919614407352",
  whatsappNumber: "919614407352", // digits only, with country code
  whatsappGreeting: "Hi Dr. Rishi, I'd like to book an appointment.",
  email: null as string | null, // [CONFIRM] — set the clinic email here
  address: {
    line1: "Gate No. 3, P.O. Shivmandir",
    line2: "Opposite N.B.U, Kadamtala",
    city: "Siliguri",
    state: "West Bengal",
    pin: "734011",
    plusCode: "P966+PJ Kadamtala",
  },
  mapsShareUrl: "https://maps.app.goo.gl/eAV6rCBYafHAbfcs6",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=P966%2BPJ%20Kadamtala%2C%20Siliguri%2C%20West%20Bengal%20734011&output=embed",
  rating: { value: 4.8, count: 19 },
  instagram: "https://www.instagram.com/dr_rishiray/",
  facebook:
    "https://www.facebook.com/p/%F0%9D%90%83%F0%9D%90%91-%F0%9D%90%91%F0%9D%90%88%F0%9D%90%92%F0%9D%90%87%F0%9D%90%88-%F0%9D%90%91%F0%9D%90%80%F0%9D%90%98-%F0%9D%90%8C%F0%9D%90%83%F0%9D%90%92-61575955931602/",
  googleReviewsUrl: "https://maps.app.goo.gl/eAV6rCBYafHAbfcs6",
};

export const doctor = {
  name: "Dr. Rishi Ray",
  shortName: "Dr. Rishi",
  degree: "MDS",
  // Corroborated by the clinic's own Justdial listing
  // ("Dr Rishi Ray Dental Surgeon and Prosthodontist").
  specialisation: "Dental Surgeon & Prosthodontist",
  registrationNo: null as string | null, // [CONFIRM] — shown once provided
  yearsOfExperience: null as number | null, // [CONFIRM] — drives the trust strip
  // [PLACEHOLDER BIO — replace with the doctor's own words]
  bio: "Dr. Rishi Ray is an MDS-qualified dental surgeon and prosthodontist practising at Ray Dental Care, Kadamtala, Siliguri. His patients describe him as calm, compassionate and meticulous — a doctor who explains every step, works gently, and treats every patient like family.",
  philosophy:
    "Honest diagnosis, painless treatment, and no procedure you don't need.",
};

export const hours = [
  // [CONFIRM] — Google currently shows "opens 6 PM" on weekdays.
  { days: "Monday – Saturday", time: "From 6:00 PM", confirmed: false },
  { days: "Sunday", time: "By appointment — call to confirm", confirmed: false },
];

export const hero = {
  eyebrow: "Ray Dental Care · Kadamtala, Siliguri",
  headline: "Gentle, precise dental care — minutes from N.B.U.",
  subheadline:
    "MDS-qualified care, sterilised instruments and a calm, homely clinic. Patients from Siliguri trust us with their smiles — 4.8★ on Google.",
  chips: ["MDS", "4.8★ on Google", "Gentle, painless care"],
  portrait: drRishiCutout,
  background: clinicBg,
};

export const trustStrip = {
  stats: [
    { label: "Google rating", value: 4.8, suffix: "★", decimals: 1 },
    { label: "Google reviews", value: 19, suffix: "", decimals: 0 },
    { label: "Qualification", value: null, text: "MDS" },
    { label: "Instruments", value: null, text: "Sterilised" },
  ],
};

export const aboutImages = {
  clinicInterior:
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=900&q=75&auto=format&fit=crop",
  dentistAtWork:
    "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&q=75&auto=format&fit=crop",
  doctorPortrait: drRishiClinic,
  doctorConference: drRishiConference,
};

export type Service = {
  id: string;
  name: string;
  benefit: string;
  icon:
    | "sparkles"
    | "zap"
    | "anchor"
    | "crown"
    | "smile"
    | "align"
    | "circle-minus"
    | "wand"
    | "baby";
};

export const services: Service[] = [
  {
    id: "scaling-polishing",
    name: "Scaling & Polishing",
    benefit: "Fresher breath and brighter teeth in a single sitting.",
    icon: "sparkles",
  },
  {
    id: "root-canal",
    name: "Root Canal Treatment",
    benefit: "Save the tooth, lose the pain — done gently and precisely.",
    icon: "zap",
  },
  {
    id: "dental-implants",
    name: "Dental Implants",
    benefit: "A permanent, natural-feeling replacement for missing teeth.",
    icon: "anchor",
  },
  {
    id: "crowns-bridges",
    name: "Crowns & Bridges",
    benefit: "Strong, natural-looking caps to restore damaged teeth.",
    icon: "crown",
  },
  {
    id: "dentures",
    name: "Dentures",
    benefit: "Comfortable, well-fitted dentures you can eat and smile with.",
    icon: "smile",
  },
  {
    id: "braces-aligners",
    name: "Braces & Aligners",
    benefit: "Straighter smiles for teens and adults, at your pace.",
    icon: "align",
  },
  {
    id: "extractions",
    name: "Extractions",
    benefit: "Quick, gentle removal when a tooth can't be saved.",
    icon: "circle-minus",
  },
  {
    id: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    benefit: "Smile makeovers designed around your face, not a template.",
    icon: "wand",
  },
  {
    id: "kids-dentistry",
    name: "Kids' Dentistry",
    benefit: "Patient, friendly first visits that build happy dental habits.",
    icon: "baby",
  },
];

export const whyChooseUs = [
  {
    title: "Calm & compassionate",
    text: "Patients call his empathy and soft behaviour his USP — you're listened to, never rushed.",
  },
  {
    title: "Painless procedures",
    text: "Gentle technique and able hands that make even big procedures feel smooth and painless.",
  },
  {
    title: "Hygienic & well-equipped",
    text: "Top-notch facilities, sterilised instruments and modern equipment at every visit.",
  },
  {
    title: "A quiet, homely clinic",
    text: "No hospital anxiety here — a calm, homely ambience minutes from N.B.U and Kadamtala.",
  },
];

export const reviews = [
  {
    name: "Arnab C.",
    text: "Very caring and compassionate with his work and patient handling… a very comforting and high standard dental treatment.",
  },
  {
    name: "Tapabrata P.",
    text: "Top-notch facilities and hygiene… his able hands made the procedure smooth and painless for my relative.",
  },
  {
    name: "Surajit M.",
    text: "Extremely professional… empathy and soft behaviour towards his patients is his USP.",
  },
  {
    name: "Pratim R.",
    text: "Calm, composed and meticulous in his job.",
  },
  {
    name: "Riju C.",
    text: "Doctor is well behaved, decent, with tremendous knowledge and precision.",
  },
];

export const howItWorks = [
  {
    step: "1",
    title: "Book",
    text: "Call, WhatsApp or use the form below — we confirm your slot shortly.",
  },
  {
    step: "2",
    title: "Consult",
    text: "Meet Dr. Rishi Ray for an honest check-up and a clear treatment plan.",
  },
  {
    step: "3",
    title: "Treatment & follow-up",
    text: "Gentle treatment, clear aftercare and a follow-up until you're fully healed.",
  },
];

export const faqs = [
  {
    q: "What happens at my first visit?",
    a: "Dr. Ray examines your teeth and gums, listens to your concerns, and explains what he finds in plain language. You always get a clear treatment plan and cost estimate before anything begins — no surprises.",
  },
  {
    q: "Will the treatment hurt?",
    a: "Patients consistently describe our procedures as smooth and painless. Gentle technique and proper anaesthesia come standard, and nervous patients are handled with extra care.",
  },
  {
    q: "How much does treatment cost?",
    a: "Costs vary with the treatment and materials used. You receive a written estimate after the consultation, before any work starts, so you can decide comfortably.",
  },
  {
    q: "Do you handle dental emergencies?",
    a: "Yes — call or WhatsApp the clinic and describe the problem. We keep slots aside for urgent pain, swelling and broken teeth whenever possible.",
  },
  {
    q: "What payment options are available?",
    a: "We accept cash and UPI.",
  },
  {
    q: "What are the clinic timings?",
    a: "Monday to Saturday from 6:00 PM onwards. Evening slots suit students and working patients — Sunday availability is confirmed on call.",
  },
  {
    q: "Do you treat children?",
    a: "Yes. Kids' visits are kept short, friendly and pain-free so the first experience builds trust instead of fear.",
  },
];

export const images = {
  sterilisation:
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&q=75&auto=format&fit=crop",
  treatmentRoom:
    "https://images.unsplash.com/photo-1588776813677-77aaf5595b83?w=900&q=75&auto=format&fit=crop",
  dentalChair:
    "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=900&q=75&auto=format&fit=crop",
  brandMark,
};

/** GA4 / Meta Pixel placeholders — paste real IDs and they activate. */
export const tracking = {
  gaMeasurementId: "", // e.g. "G-XXXXXXX"
  metaPixelId: "", // e.g. "1234567890"
};
