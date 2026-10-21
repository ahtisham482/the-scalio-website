import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@vercel/analytics";
import { submitLead } from "@/lib/submitLead";
import { OFFER } from "@/data/offer";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const AD_SPEND_OPTIONS = [
  "Under $2K/month",
  "$2K–$10K/month",
  "$10K–$50K/month",
  "$50K+/month",
];
const MARKETPLACE_OPTIONS = ["US", "UK", "EU", "Canada", "Other"];

type FormData = {
  name: string;
  email: string;
  store: string;
  adSpend: string;
  marketplace: string;
  message: string;
  website: string; // honeypot: real visitors never see or fill this
};
type FormErrors = Partial<Record<keyof FormData, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (form: FormData): FormErrors => {
  const errors: FormErrors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  if (!name) errors.name = "Name is required";
  else if (name.length > 100) errors.name = "Name is too long";
  if (!EMAIL_RE.test(email) || email.length > 255)
    errors.email = "Please enter a valid email";
  if (!form.store.trim())
    errors.store = "Add your Amazon store, brand or ASIN link";
  else if (form.store.length > 300) errors.store = "Link is too long";
  if (!form.adSpend) errors.adSpend = "Pick your monthly ad spend";
  if (form.message.length > 2000) errors.message = "Message is too long";
  return errors;
};

const emptyForm: FormData = {
  name: "",
  email: "",
  store: "",
  adSpend: "",
  marketplace: "US",
  message: "",
  website: "",
};

const ContactForm = () => {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submittedName, setSubmittedName] = useState("");

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    const name = form.name.trim();
    setSubmittedName(name.split(" ")[0]);

    // Bots fill every field; pretend success and send nothing.
    if (form.website) {
      setStatus("success");
      return;
    }

    setStatus("submitting");

    const ok = await submitLead({
      name,
      email: form.email.trim(),
      message: [
        `Store: ${form.store.trim()}`,
        `Monthly ad spend: ${form.adSpend}`,
        `Marketplace: ${form.marketplace}`,
        "",
        form.message.trim() || "(No message)",
      ].join("\n"),
    });

    if (ok) {
      track("audit_requested", { adSpend: form.adSpend });
      setStatus("success");
      setForm(emptyForm);
    } else {
      setStatus("error");
    }
  };

  // CT4 — Personalized success state
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
        className="text-center py-8"
      >
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <svg
            className="w-7 h-7 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-display font-semibold text-foreground mb-2">
          Thanks, {submittedName}! Your audit request is confirmed.
        </h3>
        <p className="text-muted-foreground font-body text-sm mb-1">
          A senior strategist will email your written audit within{" "}
          {OFFER.turnaround}.
        </p>
        <p className="text-muted-foreground font-body text-xs mb-6">
          In the meantime, check out how we&apos;ve helped brands like yours.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="#case-studies"
            className="text-xs font-mono tracking-wider text-primary hover:underline"
          >
            View Case Studies
          </a>
          <span className="text-border">|</span>
          <a
            href="#faq"
            className="text-xs font-mono tracking-wider text-primary hover:underline"
          >
            Read FAQ
          </a>
          <span className="text-border">|</span>
          <button
            onClick={() => setStatus("idle")}
            className="text-xs font-mono tracking-wider text-muted-foreground hover:text-foreground"
          >
            Send Another
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative space-y-4 text-left">
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground mb-2"
          >
            Your Name *
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full bg-card/60 border border-border/50 rounded-xl px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all form-focus-glow"
            placeholder="Jane Smith"
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-400 mt-1.5 font-body"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground mb-2"
          >
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full bg-card/60 border border-border/50 rounded-xl px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all form-focus-glow"
            placeholder="jane@brand.com"
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-400 mt-1.5 font-body"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Store link — the audit needs to know which account to review */}
      <div>
        <label htmlFor="store" className="block text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground mb-2">
          Amazon Store, Brand or ASIN Link *
        </label>
        <input
          id="store"
          type="text"
          inputMode="url"
          value={form.store}
          onChange={(e) => handleChange("store", e.target.value)}
          aria-invalid={!!errors.store}
          aria-describedby={errors.store ? "store-error" : undefined}
          className="w-full bg-card/60 border border-border/50 rounded-xl px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all form-focus-glow"
          placeholder="Store link, brand link or ASIN"
        />
          <AnimatePresence>
            {errors.store && (
              <motion.p
                id="store-error"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs text-red-400 mt-1.5 font-body"
              >
                {errors.store}
              </motion.p>
            )}
          </AnimatePresence>
      </div>

      {/* Ad spend + marketplace */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="adSpend" className="block text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground mb-2">
            Monthly Ad Spend *
          </label>
          <select
            id="adSpend"
            value={form.adSpend}
            onChange={(e) => handleChange("adSpend", e.target.value)}
            aria-invalid={!!errors.adSpend}
            aria-describedby={errors.adSpend ? "adSpend-error" : undefined}
            className="w-full bg-card/60 border border-border/50 rounded-xl px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all form-focus-glow"
          >
            <option value="" disabled>
              Choose a range
            </option>
            {AD_SPEND_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
            <AnimatePresence>
              {errors.adSpend && (
                <motion.p
                  id="adSpend-error"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-red-400 mt-1.5 font-body"
                >
                  {errors.adSpend}
                </motion.p>
              )}
            </AnimatePresence>
        </div>
        <div>
          <label htmlFor="marketplace" className="block text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground mb-2">
            Main Marketplace
          </label>
          <select
            id="marketplace"
            value={form.marketplace}
            onChange={(e) => handleChange("marketplace", e.target.value)}
            className="w-full bg-card/60 border border-border/50 rounded-xl px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all form-focus-glow"
          >
            {MARKETPLACE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Honeypot — hidden from people and screen readers, bots fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => handleChange("website", e.target.value)}
        />
      </div>

      {/* Message — CT6: now optional */}
      <div>
        <label
          htmlFor="message"
          className="block text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground mb-2"
        >
          Your Message
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          rows={3}
          className="w-full bg-card/60 border border-border/50 rounded-xl px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
          placeholder="Optional — or just submit and we'll ask on the call."
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group relative w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-full transition-all duration-500 hover:shadow-[0_0_60px_-8px_hsl(var(--primary)/0.5)] hover:scale-[1.02] overflow-hidden disabled:opacity-60 disabled:pointer-events-none"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        <span className="relative z-10 flex items-center gap-2">
          {status === "submitting" ? "Sending..." : OFFER.cta}
          {status !== "submitting" && (
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          )}
        </span>
      </button>

      {/* CT5 — Error with email fallback */}
      {status === "error" && (
        <p className="text-xs text-red-400 text-center font-body">
          Something went wrong. Please try again, or email us directly at{" "}
          <a href="mailto:hello@thescalio.com" className="underline">
            hello@thescalio.com
          </a>
          .
        </p>
      )}

      <p className="text-[10px] text-muted-foreground text-center font-body leading-relaxed mt-2">
        By submitting this form, you agree to our{" "}
        <a href="/privacy" className="underline hover:text-muted-foreground">
          privacy policy
        </a>
        . We&apos;ll only use your information to respond to your inquiry. No
        spam, ever.
      </p>
    </form>
  );
};

export default ContactForm;
