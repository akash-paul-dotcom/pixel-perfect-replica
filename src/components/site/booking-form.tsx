import { useEffect, useState } from "react";
import { CalendarCheck, CheckCircle2, LoaderCircle, MessageCircle, Phone } from "lucide-react";

import { clinic, services } from "@/config/site";
import { trackEvent } from "@/lib/tracking";
import { waLink } from "@/components/site/chrome";
import { submitLead } from "@/lib/leads.functions";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-input bg-background/70 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/25";

function collectUtm(): Record<string, string> {
  try {
    const utm: Record<string, string> = {};
    new URLSearchParams(window.location.search).forEach((value, key) => {
      if (key.startsWith("utm_") && value) utm[key] = value;
    });
    return utm;
  } catch {
    return {};
  }
}

function digitsOnly(phone: string) {
  return phone.replace(/\D/g, "");
}

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [minDate, setMinDate] = useState<string | undefined>();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    preferredDate: "",
    timeSlot: "evening" as "morning" | "evening",
    message: "",
    consent: false,
    website: "", // honeypot
  });

  useEffect(() => {
    // Set after mount so SSR and client markup match.
    const today = new Date();
    const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
      today.getDate(),
    ).padStart(2, "0")}`;
    setMinDate(iso);
  }, []);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    const phone = digitsOnly(form.phone);
    if (phone.length < 10 || phone.length > 13) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!form.service) {
      setError("Please choose a treatment (or 'Not sure yet').");
      return;
    }
    if (!form.consent) {
      setError("Please allow us to contact you about your appointment.");
      return;
    }

    setStatus("submitting");
    const result = await submitLead({ data: {
      name: form.name.trim(),
      phone,
      service: form.service,
      preferredDate: form.preferredDate || undefined,
      timeSlot: form.timeSlot,
      message: form.message.trim() || undefined,
      consent: true,
      website: form.website || undefined,
      utm: collectUtm(),
    } });

    if (!result.ok) {
      setStatus("error");
      setError(result.error);
      return;
    }
    setStatus("success");
    trackEvent("form_submit", { service: form.service, slot: form.timeSlot });
  }

  const whatsappConfirm = waLink(
    `Hi Dr. Rishi, I just requested an appointment on your website.\nName: ${form.name}\nTreatment: ${form.service}\nPreferred: ${form.preferredDate || "any day"} (${form.timeSlot})`,
  );

  return (
    <section id="book" className="section-anchor mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="glass mx-auto max-w-2xl rounded-3xl p-6 sm:p-8">
        {status === "success" ? (
          <div className="py-6 text-center">
            <span className="mx-auto inline-flex rounded-full bg-secondary p-4 text-secondary-foreground">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold">
              Request received — thank you!
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              We'll call you on <strong className="text-foreground">{form.phone}</strong> to
              confirm your slot for <strong className="text-foreground">{form.service}</strong>.
              For a faster confirmation, message us on WhatsApp:
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappConfirm}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "form_success" })}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/30"
              >
                <MessageCircle className="h-5 w-5" /> Confirm on WhatsApp
              </a>
              <a
                href={`tel:${clinic.phoneE164}`}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-background/70 px-6 py-3.5 text-sm font-bold text-foreground"
              >
                <Phone className="h-4 w-4 text-primary" /> Call instead
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center">
              <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <CalendarCheck className="h-3.5 w-3.5" /> Book an appointment
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                Request your slot
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill this in and we'll call you back to confirm — or WhatsApp us directly.
              </p>
            </div>

            <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
              {/* Honeypot — humans never see this */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={(e) => set("website", e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="bf-name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Your name *
                  </label>
                  <input
                    id="bf-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className={inputClass}
                    autoComplete="name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="bf-phone" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Mobile number *
                  </label>
                  <input
                    id="bf-phone"
                    type="tel"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="10-digit mobile"
                    className={inputClass}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="bf-service" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Treatment *
                  </label>
                  <select
                    id="bf-service"
                    value={form.service}
                    onChange={(e) => set("service", e.target.value)}
                    className={inputClass}
                    required
                  >
                    <option value="" disabled>
                      Choose a treatment
                    </option>
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                    <option value="Not sure yet — need a check-up">
                      Not sure yet — need a check-up
                    </option>
                  </select>
                </div>
                <div>
                  <label htmlFor="bf-date" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Preferred date
                  </label>
                  <input
                    id="bf-date"
                    type="date"
                    min={minDate}
                    value={form.preferredDate}
                    onChange={(e) => set("preferredDate", e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <fieldset>
                <legend className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Preferred time
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  {(["morning", "evening"] as const).map((slot) => (
                    <label
                      key={slot}
                      className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold capitalize transition ${
                        form.timeSlot === slot
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-input bg-background/70 text-muted-foreground"
                      }`}
                    >
                      <input
                        type="radio"
                        name="timeSlot"
                        value={slot}
                        checked={form.timeSlot === slot}
                        onChange={() => set("timeSlot", slot)}
                        className="sr-only"
                      />
                      {slot}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="bf-message" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Anything we should know? <span className="font-normal normal-case">(optional)</span>
                </label>
                <textarea
                  id="bf-message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="e.g. tooth pain since yesterday, nervous patient, etc."
                  className={inputClass}
                />
              </div>

              <label className="flex items-start gap-3 rounded-xl bg-background/60 p-3 text-sm">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[oklch(0.5_0.115_205)]"
                  required
                />
                <span className="text-muted-foreground">
                  I agree to be contacted by {clinic.name} about my appointment request.
                </span>
              </label>

              {error ? (
                <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-primary/90 active:scale-[0.99] disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <>
                    <LoaderCircle className="h-5 w-5 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <CalendarCheck className="h-5 w-5" /> Request my appointment
                  </>
                )}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                No spam, ever. We only call or message about your appointment.
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
