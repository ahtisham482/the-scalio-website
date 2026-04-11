import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(255, "Email is too long"),
  company: z.string().trim().max(100, "Company name is too long").optional(),
  revenue: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(2000, "Message is too long"),
});

type FormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

const revenueOptions = [
  "Pre-launch (not yet selling)",
  "Under $10K/month",
  "$10K – $50K/month",
  "$50K – $100K/month",
  "$100K+/month",
];

const ContactForm = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    revenue: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    const { error } = await supabase.from("contact_submissions").insert({
      name: result.data.name,
      email: result.data.email,
      message: `${result.data.company ? `Company: ${result.data.company}\n` : ""}${result.data.revenue ? `Revenue: ${result.data.revenue}\n\n` : ""}${result.data.message}`,
    });

    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ name: "", email: "", company: "", revenue: "", message: "" });
    }
  };

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
          Message sent!
        </h3>
        <p className="text-muted-foreground font-body text-sm">
          We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-primary text-sm font-body hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
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
            className="w-full bg-card/60 border border-border/50 rounded-xl px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
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
            className="w-full bg-card/60 border border-border/50 rounded-xl px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
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

      {/* Company + Revenue row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="company"
            className="block text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground mb-2"
          >
            Brand / Company
          </label>
          <input
            id="company"
            type="text"
            value={form.company || ""}
            onChange={(e) => handleChange("company", e.target.value)}
            className="w-full bg-card/60 border border-border/50 rounded-xl px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all"
            placeholder="Your brand name"
          />
        </div>
        <div>
          <label
            htmlFor="revenue"
            className="block text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground mb-2"
          >
            Monthly Revenue
          </label>
          <select
            id="revenue"
            value={form.revenue || ""}
            onChange={(e) => handleChange("revenue", e.target.value)}
            className="w-full bg-card/60 border border-border/50 rounded-xl px-4 py-3 text-foreground font-body text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all appearance-none"
          >
            <option value="" className="bg-background">
              Select range...
            </option>
            {revenueOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-background">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground mb-2"
        >
          Your Message *
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          rows={3}
          className="w-full bg-card/60 border border-border/50 rounded-xl px-4 py-3 text-foreground font-body text-sm placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
          placeholder="Tell us about your brand and goals..."
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-red-400 mt-1.5 font-body"
            >
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group relative w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-body font-semibold text-sm tracking-wide rounded-full transition-all duration-500 hover:shadow-[0_0_60px_-8px_hsl(var(--primary)/0.5)] hover:scale-[1.02] overflow-hidden disabled:opacity-60 disabled:pointer-events-none"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        <span className="relative z-10 flex items-center gap-2">
          {status === "submitting" ? "Sending..." : "Book Your Free Audit"}
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

      {status === "error" && (
        <p className="text-xs text-red-400 text-center font-body">
          Something went wrong. Please try again.
        </p>
      )}

      <p className="text-[10px] text-muted-foreground/50 text-center font-body leading-relaxed mt-2">
        By submitting this form, you agree to our privacy policy. We&apos;ll
        only use your information to respond to your inquiry. No spam, ever.
      </p>
    </form>
  );
};

export default ContactForm;
