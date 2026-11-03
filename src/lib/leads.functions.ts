import { createHash } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid 10-digit mobile number")
    .max(17),
  service: z.string().trim().min(1).max(80),
  preferredDate: z.string().trim().max(20).optional(),
  timeSlot: z.enum(["morning", "evening"]),
  message: z.string().trim().max(600).optional(),
  consent: z.literal(true),
  // Honeypot must stay empty — humans never see this field.
  website: z.string().max(120).optional(),
  utm: z.record(z.string(), z.string().max(300)).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    // Bots filling the hidden field get a fake success and are dropped.
    if (data.website) return { ok: true as const };

    const req = getRequest();
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const ipHash = createHash("sha256")
      .update(`ray-dental-salt:${ip}`)
      .digest("hex")
      .slice(0, 32);

    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    // Simple rate limit: at most 5 leads per IP in 10 minutes.
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("booking_requests")
      .select("id", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", since);

    if ((count ?? 0) >= 5) {
      return { ok: false as const, error: "Too many requests — please try again in a few minutes." };
    }

    const { error } = await supabaseAdmin.from("booking_requests").insert({
      name: data.name,
      phone: data.phone,
      service: data.service,
      preferred_date: data.preferredDate || null,
      time_slot: data.timeSlot,
      message: data.message || null,
      consent: data.consent,
      utm: data.utm ?? {},
      ip_hash: ipHash,
      user_agent: req.headers.get("user-agent") ?? null,
    });

    if (error) {
      console.error("[lead] insert failed:", error.message);
      return { ok: false as const, error: "We couldn't save your request — please call or WhatsApp us instead." };
    }

    return { ok: true as const };
  });
